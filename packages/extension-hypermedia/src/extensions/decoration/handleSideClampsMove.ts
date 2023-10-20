// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const MIN_WIDTH = 60;
const MIN_HEIGHT = 30;

export default (clamp, gripper, editor, prob) => {
  let initialX = 0,
    initialY = 0,
    initialWidth = 0,
    initialHeight = 0,
    initialLeft = 0,
    initialTop = 0;

  clamp.addEventListener("mousedown", function (e) {
    // Prevent default behavior of the event
    e.preventDefault();

    // Store the initial cursor position and sizes
    initialX = e.clientX;
    initialY = e.clientY;
    initialWidth = gripper.offsetWidth;
    initialHeight = gripper.offsetHeight;
    initialTop = gripper.offsetTop;
    initialLeft = gripper.offsetLeft;

    // Add the mousemove and mouseup event listeners to the document
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  function handleMouseUp() {
    // Remove the event listeners when the mouse button is released
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    // Here you can get the final size and append it to the wrapper
    const finalWidth = gripper.offsetWidth;
    const finalHeight = gripper.offsetHeight;

    gripper.style.left = `${initialLeft}px`;
    gripper.style.top = `${initialTop}px`;

    const currentNodePos = prob.from || null;

    const { state, dispatch } = editor.view;
    const { tr } = state;

    if (currentNodePos) {
      tr.setNodeAttribute(currentNodePos, "width", finalWidth);
      tr.setNodeAttribute(currentNodePos, "height", finalHeight);

      const domAtPos = editor.view.nodeDOM(currentNodePos);

      domAtPos.style.width = `${finalWidth}px`;
      domAtPos.style.height = `${finalHeight}px`;

      // Create a new transaction to update the node attributes
      tr.setNodeMarkup(currentNodePos, null, {
        ...state.doc.nodeAt(currentNodePos).attrs,
        width: finalWidth,
        height: finalHeight,
      });

      // Set meta data on the transaction if necessary
      tr.setMeta("resizeMedia", true);
      tr.setMeta("addToHistory", true);

      dispatch(tr);
    }
  }

  function handleMouseMove(e) {
    const deltaX = e.clientX - initialX;
    const deltaY = e.clientY - initialY;

    let newWidth, newHeight;

    if (clamp.classList.contains("media-resize-clamp--left")) {
      newWidth = initialWidth - deltaX;
      if (newWidth >= MIN_WIDTH) {
        gripper.style.width = `${newWidth}px`;
        gripper.style.left = `${initialLeft + deltaX}px`;
      }
    } else if (clamp.classList.contains("media-resize-clamp--right")) {
      newWidth = initialWidth + deltaX;
      if (newWidth >= MIN_WIDTH) {
        gripper.style.width = `${newWidth}px`;
      }
    } else if (clamp.classList.contains("media-resize-clamp--top")) {
      newHeight = initialHeight - deltaY;
      if (newHeight >= MIN_HEIGHT) {
        gripper.style.height = `${newHeight}px`;
        gripper.style.top = `${initialTop + deltaY}px`;
      }
    } else if (clamp.classList.contains("media-resize-clamp--bottom")) {
      newHeight = initialHeight + deltaY;
      if (newHeight >= MIN_HEIGHT) {
        gripper.style.height = `${newHeight}px`;
      }
    }
  }
};
