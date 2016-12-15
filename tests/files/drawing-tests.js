var _debug = function(obj){
  console.log(JSON.stringify(obj, null, 2));
};

describe('canvas tests', function(){
  it('should generate entity', function(done){
    load('sample6_model.json').done(function(json){
      var model = Builder.createFromJson(json);
      expect(model.name).to.equal('model');
      expect(model.entities.length).to.equal(2);
      var helper = new CanvasHelper();
      var group = helper.generateFromEntity(model.entities[0]);
      expect(group).to.be.defined;
      // var text = group.findOne('Text');
      // var rect = group.findOne('Rect');
      // expect(rect.className).to.equal('Rect');
      // expect(text.className).to.equal('Text');
      // var cr = rect.getClientRect();
      // var pos = {
      //   x: cr.width/2,
      //   y: cr.height/2
      // };
      //
      // expect(text.x()).to.equal(pos.x);
      // expect(text.y()).to.equal(pos.y);
      // var tpos = text.getPosition();
      // var tapos = text.getAbsolutePosition();
      // _debug({
      //   tpos: tpos,
      //   tapos: tapos
      // })
      done();
    });

  });
})
