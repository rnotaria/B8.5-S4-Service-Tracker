// Custom version of https://www.npmjs.com/package/react-sliding-pane

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

var CLOSE_TIMEOUT = 500;
function ReactSlidingPane(_ref) {
  var isOpen = _ref.isOpen,
    title = _ref.title,
    subtitle = _ref.subtitle,
    onRequestClose = _ref.onRequestClose,
    onAfterOpen = _ref.onAfterOpen,
    children = _ref.children,
    className = _ref.className,
    overlayClassName = _ref.overlayClassName,
    _ref$from = _ref.from,
    from = _ref$from === void 0 ? "right" : _ref$from,
    height = _ref.height,
    shouldCloseOnEsc = _ref.shouldCloseOnEsc;
  var directionClass = "slide-pane_from_".concat(from);
  return (
    <div className="center">
      {
        /*#__PURE__*/ React.createElement(
          Modal,
          {
            ariaHideApp: false,
            className: "slide-pane "
              .concat(directionClass, " ")
              .concat(className || ""),
            style: {
              content: {
                height: height || "auto",
                position: "absolute",
                bottom: "0px",
              },
            },
            overlayClassName: "slide-pane__overlay ".concat(
              overlayClassName || ""
            ),
            closeTimeoutMS: CLOSE_TIMEOUT,
            isOpen: isOpen,
            shouldCloseOnEsc: shouldCloseOnEsc,
            onAfterOpen: onAfterOpen,
            onRequestClose: onRequestClose,
            contentLabel: 'Modal "'.concat(title || "", '"'),
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "slide-pane__header",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "slide-pane__title-wrapper",
              },
              /*#__PURE__*/ React.createElement(
                "h2",
                {
                  className: "slide-pane__title",
                },
                title
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "slide-pane__subtitle",
                },
                subtitle
              )
            )
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "slide-pane__content",
            },
            children
          )
        )
      }
    </div>
  );
}
ReactSlidingPane.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  onRequestClose: PropTypes.func,
  onAfterOpen: PropTypes.func,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  from: PropTypes.oneOf(["left", "right", "bottom"]),
  width: PropTypes.string,
  shouldCloseOnEsc: PropTypes.bool,
};

export default ReactSlidingPane;
