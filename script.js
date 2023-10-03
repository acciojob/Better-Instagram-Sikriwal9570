//your code here
// Initialize Interact.js
interact('.draggable-div')
  .draggable({
    inertia: true,
    restrict: {
      restriction: 'parent',
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
  })
  .on('dragmove', function (event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // Update the element's position
    target.style.transform = `translate(${x}px, ${y}px)`;

    // Store the new position
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  })
  .on('dragend', function (event) {
    const target = event.target;
    target.removeAttribute('data-x');
    target.removeAttribute('data-y');
  });

// Add dropzone functionality
interact('.draggable-div')
  .dropzone({
    accept: '.draggable-div',
    overlap: 0.75,

    // Swap content when dropping on a valid target
    ondropactivate: function (event) {
      event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
      const draggableElement = event.relatedTarget;
      const dropzoneElement = event.target;

      // Swap the background images
      const tempBg = draggableElement.style.backgroundImage;
      draggableElement.style.backgroundImage = dropzoneElement.style.backgroundImage;
      dropzoneElement.style.backgroundImage = tempBg;
    },
    ondragleave: function (event) {
      event.target.classList.remove('drop-active');
    },
    ondrop: function (event) {
      event.target.classList.remove('drop-active');
    },
    ondropdeactivate: function (event) {
      event.target.classList.remove('drop-active');
    }
  });

