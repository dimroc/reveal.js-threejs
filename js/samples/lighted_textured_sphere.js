(function() {

  var width, height;
  width = height = 300;

  window.samples.lighted_textured_sphere = {

    initialize: function(canvas) {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1000 );
      camera.position.z = 100;

      var texture = THREE.ImageUtils.loadTexture('images/checker_large.gif', {}, function() {
        animate();
      });

      var geometry = new THREE.SphereGeometry( 50, 30, 30 );
      var material = new THREE.MeshPhongMaterial( {
        map: texture,
        ambient: 0xffffffff,
        color: 0xffffffff,
        specular: 0xffffffff
      } );

      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      var spotLight = new THREE.SpotLight ( 0xffffffff );
      spotLight.position.set( 0, 100, 0 );
      scene.add( spotLight );

      var ambientLight = new THREE.AmbientLight( 0x22222222 );
      scene.add(ambientLight);

      var renderer = new THREE.WebGLRenderer({canvas: canvas});
      renderer.setSize( width, height);

      var instance = { active: false };
      function animate() {
        requestAnimationFrame( animate, canvas );
        mesh.material.wireframe = sample_defaults.wireframe;
        if(!instance.active || sample_defaults.paused) return;

        // Rotate lighting around the X axis.
        var angle = 0.01;
        var matrix = new THREE.Matrix4().makeRotationX( angle );

        spotLight.position = spotLight.position.applyMatrix4(matrix);
        renderer.render( scene, camera );
      }

      return instance;
    }
  };
})();
