// Generated by CoffeeScript 1.3.3
(function() {

  define(function(require) {
    var $, CodeEditorView, MainMenuView, Project, ProjectFile, app, bla, marionette, testcode, _;
    $ = require('jquery');
    _ = require('underscore');
    marionette = require('marionette');
    require('bootstrap');
    CodeEditorView = require("views/codeView");
    MainMenuView = require("views/menuView");
    bla = require("modules/project");
    ProjectFile = bla[0];
    Project = bla[1];
    testcode = "\nclass CubeClass\n  width:20\n  length:20\n  height:20\n  constructor: (@pos=[0,0,0], @rot=[0,0,0]) ->\n    return @render()\n  \n  render: =>\n    result = new CSG()\n    cube1 =CSG.cube({center: [0, 0, @height/2],radius: [@width/2, @length/2, @height/2]})\n    result = cube1\n    return result.translate(@pos).rotateX(@rot[0]).rotateY(@rot[1]).rotateZ(@rot[2]) \n\ncubeStuff = new CubeClass()\nreturn cubeStuff";
    app = new marionette.Application({
      root: "/opencoffeescad",
      cadProcessor: null,
      updateSolid: function() {
        return app.cadProcessor.setCoffeeSCad(app.cadEditor.getValue());
      }
    });
    app.addRegions({
      navigationRegion: "#navigation",
      mainRegion: "#mainContent",
      statusRegion: "#statusBar"
    });
    app.on("start", function(opts) {
      return console.log("at start");
    });
    app.on("initialize:after", function() {
      return console.log("after init");
    });
    app.addInitializer(function(options) {
      var _this = this;
      app.model = new ProjectFile({
        name: "main",
        ext: "coscad",
        content: testcode
      });
      app.codeEditorView = new CodeEditorView({
        model: app.model
      });
      app.mainMenuView = new MainMenuView({
        model: app.model
      });
      app.mainRegion.show(app.codeEditorView);
      app.navigationRegion.show(app.mainMenuView);
      app.codeEditorView.on("item:on:beforerender", function() {
        return console.log("the view is about to be rendered");
      });
      app.codeEditorView.on("something:do:it", function() {
        return console.log("I DID IT!");
      });
      app.mainMenuView.on("file:new:clicked", function() {
        return console.log("newfile");
      });
      app.mainMenuView.on("file:save:clicked", function() {
        console.log("savefile");
        return _this.model.save(null, {
          success: function(model, response) {
            console.log("sucess");
            return console.log(model);
          },
          error: function(model, response) {
            return console.log('failed');
          }
        });
      });
      return app.mainMenuView.on("file:load:clicked", function() {
        console.log("loadfile");
        return _this.model.fetch({
          success: function(model, response) {
            console.log("sucess");
            console.log(model);
            return _this.codeEditorView.render();
          },
          error: function() {
            return console.log("error");
          }
        });
      });
    });
    /*return _.extend app,
      module: (additionalProps)->
        return _.extend
          Views: {}
          additionalProps
    */

    return app;
  });

}).call(this);