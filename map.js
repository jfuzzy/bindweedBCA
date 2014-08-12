var map = L.mapbox.map('map', 'jfuzzy.gkmn7kjn')
  		.setView([44.7077, -122.0471], 8)
  		.addControl(L.mapbox.shareControl());

  	map.legendControl.addLegend(document.getElementById('legend-content').innerHTML);
    map.legendControl.setPosition('bottomleft');

    var ui = document.getElementById('map-ui');

    addLayer(L.mapbox.tileLayer('jfuzzy.bindweed'), L.mapbox.gridLayer('jfuzzy.bindweed'),'2012', 1);
    addLayer(L.mapbox.tileLayer('jfuzzy.bindweed2013'), L.mapbox.gridLayer('jfuzzy.bindweed2013'),'2013', 2);

    function addLayer(layer, gridlayer, name, zIndex) {
      layer
          .setZIndex(zIndex)
          .addTo(map);
      gridlayer
          .addTo(map);
      // add the gridControl the active gridlayer
      var gridControl = L.mapbox.gridControl(gridlayer, {follow: true}).addTo(map);
      // Create a simple layer switcher that toggles layers on and off.
      var item = document.createElement('li');
      var link = document.createElement('a');

      link.href = '#';
      link.className = 'active';
      link.innerHTML = name;

      link.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();

          if (map.hasLayer(layer)) {
              map.removeLayer(layer);
              map.removeLayer(gridlayer);
              this.className = '';
          } else {
              map.addLayer(layer);
              map.addLayer(gridlayer);
              this.className = 'active';
          }
      };
      item.appendChild(link);
      ui.appendChild(item);
  }