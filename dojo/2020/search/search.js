/* global instantsearch */

var search = instantsearch({
  appId: '08ZAUXNBJD',
  apiKey: '50219d543249460c8deff36a0c109046',
  indexName: 'entre2020',
  urlSync: {}
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

var hitTemplate =
  '<div class="hit media">' +
    '<div class="media-body">' +
      '<h4 class="media-heading"><a href="{{{startup_url}}} ">{{{_highlightResult.startup_name.value}}}</a></h4>' +
      '<p>{{{_highlightResult.oneliner.value}}}</p>' +
    '</div>' +
  '</div>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    },
    transformData: function(hit) {
      hit.stars = [];
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= hit.rating);
      }
      return hit;
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root: 'pagination',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#genres',
    attributeName: 'genre',
    operator: 'and',
    limit: 10,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);



search.start();
