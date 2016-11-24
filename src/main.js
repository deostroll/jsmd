function getProgramAst(source) {
  return esprima.parse(source);
}

function ViewModel() {
  var self = this;
  var $fileInput;
  var $codeEditor;
  window.addEventListener('load', function() {
    $.ajax({
      url: 'sample.js'
    }).then(function(resp){
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

    $fileInput = $('#fileInput').on('change', function(e){
      self.loadFile(e.target.files[0]);
    });

    var rect = new Konva.Rect({
      height: height,
      width: width,
      stroke: 'black'
    });

    var borderLayer = new Konva.Layer();
    borderLayer.add(rect);
    stage.add(borderLayer);

    $codeEditor.height($window.height() - $codeEditor.offset().top);

    self.code.subscribe(function(source){
      var ast = getProgramAst(source);
      // console.log(JSON.stringify(ast, null, 2));
      $.ajax({
        url: '/ast',
        data: {
          ast : JSON.stringify(ast, null, 2)
        },
        method: 'POST',
      }).then(() => console.log('done...'));
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
