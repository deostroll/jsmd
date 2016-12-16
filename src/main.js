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
    }).done(function(resp) {
      self.code(resp);
    });

    var options = {
      edges: {
        arrows: 'to'
      }
    };

    var $canvas = $('#myCanvas');
    var $window = $(window);
    $codeEditor = $('#codeEditor');

    $fileInput = $('#fileInput').on('change', function(e) {
      self.loadFile(e.target.files[0]);
    });

    $codeEditor.height($window.height() - $codeEditor.offset().top);
    $canvas.width($window.width() - $canvas.offset().left);
    $canvas.height($window.height() - $canvas.offset().top);

    var network = new vis.Network(document.getElementById('myCanvas'));
    network.setOptions(options);
    self.code.subscribe(function(source) {
      var bldr = new Builder();
      var ast = esprima.parse(source);
      var model = bldr.walk(ast);
      var cache = {};
      var nodes = model.entities.map((ent, idx) => {
        cache[ent.name] = idx;
        return {
          id: idx,
          label: ent.name
        }
      });
      var edges = model.entities.reduce(function(edges, ent, idx){
        ent.fields.forEach(f => {
          if (f.def.type === 'reference') {
            var name = f.def.entityName;
            var tidx = cache[name];
            edges.push({
              from: idx, to: tidx
            });
          }
        });
        return edges;
        // if (ent.def.type === 'reference') {
        //   var name = ent.def.entityName;
        //   var tidx = cache[name];
        //   edges.push({
        //     from: idx, to: tidx
        //   })
        // }
      }, []);

      var data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges)
      };

      network.setData(data);

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
