(function(window){
  var _log = function(obj) {
    console.log(JSON.stringify(obj, null, 2));
  }
  function CanvasHelper() {

  }

  CanvasHelper.prototype = {
    generateFromModel: function(model) {
      var entities = model.entities.map(this.generateFromEntity.bind(this));
      return entities;
    },

    generateFromEntity: function(entity) {

      var group = new Konva.Group();

      var headerText = new Konva.Text({
        text: entity.name,
        fill: 'black',
        fontSize: '12',
        fontStyle: 'bold'
      });

      var texts = entity.fields.map(function(f){
        var text = new Konva.Text({
          text: f.name,
          fontSize: 10
        });
        return text;
      });

      texts.unshift(headerText);

      var res = texts.reduce(function(w, item, idx) {

        var width = item.getWidth();
        if (width > w.w) {
          w.w = width;
        }
        w.h += item.getHeight();
        return w;
      }, {
        w : 0,
        h: 0
      });

      group.add.apply(group,texts);

      texts.forEach(function(t, idx){
        var item = t;
        var r = item.getClientRect();
        if (idx === 0) {
          t.setPosition({x: 0, y: 0})
        }
        else {
          var txtPrev = texts[idx - 1];
          var offset = ((idx - 1) === 0) ? 5 : 2;
          t.setPosition({
            x: 0,
            y: txtPrev.y() + txtPrev.getHeight() + offset
          });
        }
      });

      var container = new Konva.Group();
      var grpRect = group.getClientRect();
      var rect = new Konva.Rect({
        height: grpRect.height + 10,
        width: grpRect.width + 15,
        stroke: 'black',
        strokeWidth: 1,
        x: 0,y: 0
      });
      var line = new Konva.Line({
        x: 0,
        y: headerText.y() + headerText.getHeight() + 7,
        points: [
          0,0,
          rect.getWidth(), 0
        ],
        stroke: 'black',
        strokeWidth: 1
      });
      container.add(line);
      container.add(rect);
      container.add(group);
      group.setPosition({
        x: 5, y: 5
      });

      return container;
    }
  }

  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    module.exports.CanvasHelper = CanvasHelper;
  }
  else {
    window.CanvasHelper = CanvasHelper;
  }
})(this);
