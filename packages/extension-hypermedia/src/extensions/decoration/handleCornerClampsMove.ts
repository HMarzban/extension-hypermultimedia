// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const MIN_WIDTH = 60;
const MIN_HEIGHT = 30;

export default (clamp, corner, gripper, editor, prob) => {
  let initialLeft = 0,
    initialTop = 0;

  function handleMouseDown(corner) {
    return function (e) {
      e.preventDefault();

      const initial = {
        x: e.clientX,
        y: e.clientY,
        width: gripper.offsetWidth,
        height: gripper.offsetHeight,
        top: gripper.offsetTop,
        left: gripper.offsetLeft,
      };

      function handleMouseMove(e) {
        const deltaX = e.clientX - initial.x;
        const deltaY = e.clientY - initial.y;
        let newWidth, newHeight;

        switch (corner) {
          case "topRight":
            newWidth = initial.width + deltaX;
            newHeight = initial.height - deltaY;
            if (newWidth >= MIN_WIDTH && newHeight >= MIN_HEIGHT) {
              gripper.style.width = `${newWidth}px`;
              gripper.style.height = `${newHeight}px`;
              gripper.style.top = `${initial.top + deltaY}px`;
            }
            break;
          case "bottomLeft":
            newWidth = initial.width - deltaX;
            newHeight = initial.height + deltaY;
            if (newWidth >= MIN_WIDTH && newHeight >= MIN_HEIGHT) {
              gripper.style.width = `${newWidth}px`;
              gripper.style.height = `${newHeight}px`;
              gripper.style.left = `${initial.left + deltaX}px`;
            }
            break;
          case "topLeft":
            newWidth = initial.width - deltaX;
            newHeight = initial.height - deltaY;
            if (newWidth >= MIN_WIDTH && newHeight >= MIN_HEIGHT) {
              gripper.style.width = `${newWidth}px`;
              gripper.style.height = `${newHeight}px`;
              gripper.style.top = `${initial.top + deltaY}px`;
              gripper.style.left = `${initial.left + deltaX}px`;
            }
            break;
          case "bottomRight":
            newWidth = initial.width + deltaX;
            newHeight = initial.height + deltaY;
            if (newWidth >= MIN_WIDTH && newHeight >= MIN_HEIGHT) {
              gripper.style.width = `${newWidth}px`;
              gripper.style.height = `${newHeight}px`;
            }
            break;
        }
      }

      function handleMouseUp() {
        handleMouseUpCorner(handleMouseMove);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };
  }

  function handleMouseUpCorner() {
    // Get the final size and append it to the wrapper
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

  clamp.addEventListener("mousedown", handleMouseDown(corner));
};
