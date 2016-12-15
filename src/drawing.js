(function(window){
  var _log = function(obj) {
    console.log(JSON.stringify(obj, null, 2));
  }
  function CanvasHelper() {

  }

  CanvasHelper.prototype = {
    generateFromModel: function(model) {
      var entities = model.entities.map(this.generateFromEntity.bind(this));
    },
    generateFromEntity: function(entity) {
      var group = new Konva.Group();

      var headerText = new Konva.Text({
        text: entity.name,
        fill: 'black',
        fontSize: '12'
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
        // var r = item.getClientRect();
        // console.log({
        //   text: item.text(),
        //   rect: r
        // });
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

      // console.log(res);
      var rect = new Konva.Rect({
        width: res.w,
        height: res.h,
        x: 0,
        y: 0,
        stroke: 'black',
        visible: false
      });

      group.add(rect);
      group.add.apply(group,texts);
      texts.forEach(function(t, idx){
        var item = t;
        var r = item.getClientRect();
        if (idx === 0) {
          t.setPosition({x: 0, y: 0})
        }
        else {
          var txtPrev = texts[idx - 1];
          t.setPosition({
            x: 0,
            y: txtPrev.y() + txtPrev.getHeight() + 2
          });
        }
      });
      // headerText.setOffset({
      //   x: headerText.getWidth() / 2,
      //   y: headerText.getHeight() / 2
      // });
      //
      // headerText.setX(headerRect.getWidth()/2);
      // headerText.setY(headerRect.getHeight()/2);

      return group;
    }
  }

  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    module.exports.CanvasHelper = CanvasHelper;
  }
  else {
    window.CanvasHelper = CanvasHelper;
  }
})(this);
