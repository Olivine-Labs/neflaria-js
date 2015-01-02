import * as superagent from 'superagent';
import * as q from 'q';
import * as querystring from 'querystring';

import Account from '../models/account';
import Comment from '../models/comment';
import Link from '../models/link';
import Vote from '../models/vote';


import * as LRU from 'lru-cache';

var defaultCacheConfig = {
 max: 500,
 maxAge: 1000 * 50 * 3,
}

function baseGet(cache, uri, options, request, formatBody) {
  var options = options || {};
  var defer = q.defer();

  var query = options.query || {};
  var headers = options.headers || {};

  headers['User-Agent'] = options.userAgent;

  var key = uri + '?' + querystring.stringify(query);

  if (headers.Authorization) {
    if(cache) cache = cache.authed;
    key += '&auth=' + headers.Authorization;
  } else {
    if(cache) cache = cache.unauthed;
  }

  if(cache && cache.get(key)) {
    defer.resolve(cache.get(key));
    return defer.promise;
  }

  request.get(uri)
    .set(headers)
    .query(query)
    .end((res) => {
      if (!res.ok) {
        return defer.reject(res);
      }

      try {
        var body = res.body;

        if (formatBody) {
          body = formatBody(body);
        }

        if(cache) {
          cache.set(key, body);
        }

        defer.resolve(body);
      } catch (e) {
        defer.reject(e);
      }
    });

  return defer.promise;
}

function basePost(uri, options, request, formatBody) {
  var options = options || {};
  var defer = q.defer();

  var form = options.form || {};
  var headers = options.headers || {};

  if (options.userAgent) {
    headers['User-Agent'] = options.userAgent;
  }

  request.post(uri)
    .set(headers)
    .send(form)
    .type('form')
    .end((res) => {
      if (!res.ok) {
        defer.reject(res);
      }

      try {
        var body = res.body;

        if (formatBody) {
          body = formatBody(body);
        }

        defer.resolve(body);
      } catch (e) {
        defer.reject(e);
      }
    });

  return defer.promise;
}

function bind(obj, context) {
  for (var p in obj) {
    if(obj.hasOwnProperty(p) && typeof obj[p] == 'function' ) {
      obj[p] = obj[p].bind(context);
    }
  }

  return obj;
}

class APIv1Endpoint {
  constructor (config = {}) {
    this.origin = config.origin || 'https://www.neflaria.com';
    this.request = config.request || superagent;

    this.userAgent = config.userAgent;

    this.cache = {
      news: {
        unauthed: new LRU(defaultCacheConfig),
        authed: new LRU(defaultCacheConfig),
      }
    }
  }

  hydrate (endpoint, options, data) {
    var cache = this.cache[endpoint];
    var { uri, options } = this[endpoint].buildOptions(options);

    var key = uri + '?' + querystring.stringify(options.query);

    if(cache) {
      if (options.headers.Authorization) {
        cache = cache.authed;
      } else {
        cache = cache.unauthed;
      }

      cache.set(key, data);
    }
  }

  get news () {
    return bind({
      buildOptions: function(options) {
        var uri = this.origin + '/api/v1/news';

        if (this.userAgent) {
          options.userAgent = this.userAgent;
        }

        return { uri, options }
      },

      get: function(options = {}) {
        var { uri, options } = this.links.buildOptions(options);

        return baseGet(this.cache.links, uri, options, this.request, (body) => {
          return body.data.children.map(c => new wNews(c.data).toJSON());
        });
      }
    }, this);
  }
}

export default APIv1Endpoint;
