function getProgramAst(source) {
  return esprima.parse(source);
}

function ViewModel() {
  var self = this;
  var $fileInput;
  var $codeEditor;
  window.addEventListener('load', function() {
    $.ajax({
      url: 'sample10.js'
    }).then(function(resp) {
      self.code(resp);
    });

    var $canvas = $('#myCanvas');
    var width = $canvas.parent().width();
    var $window = $(window);
    var height = $window.height() - $canvas.offset().top;
    var stage = new Konva.Stage({
      width: width,
      height: height,
      container: $canvas.get(0)
    });

    $codeEditor = $('#codeEditor');

    $fileInput = $('#fileInput').on('change', function(e) {
      self.loadFile(e.target.files[0]);
    });

    var rect = new Konva.Rect({
      height: height,
      width: width,
      stroke: 'black'
    });

    var borderLayer = new Konva.Layer();
    borderLayer.add(rect);
    var layer = new Konva.Layer();

    stage.add(borderLayer);
    stage.add(layer);

    $codeEditor.height($window.height() - $codeEditor.offset().top);

    self.code.subscribe(function(source) {
      layer.removeChildren();
      var ast = getProgramAst(source);
      // console.log(JSON.stringify(ast, null, 2));
      var builder = new Builder();
      var model = builder.walk(ast);
      var draw = new CanvasHelper();
      // var group = draw.generateFromEntity(model.entities[0]);
      var entities = draw.generateFromModel(model);
      var initial = {
        x: 10,
        y: 10
      };

      entities.forEach((e, idx) => {
        if (idx === 0) {
          e.setPosition(initial)
        } else {

          var prev = entities[idx - 1];
          var r = prev.getClientRect();
          e.setPosition({
            x: r.x + r.width + 10,
            y: initial.y
          });
        }
        layer.add(e);
      });
      layer.draw();
    });

  }, false);

  self.browse = function() {
    $fileInput.trigger('click');
  };

  self.loadFile = function(file) {
    var rdr = new FileReader();
    rdr.onload = function(e) {
      var contents = e.target.result;
      self.code(contents);
    };

    rdr.readAsText(file);
  };

  self.code = ko.observable();

};

ko.applyBindings(new ViewModel());
