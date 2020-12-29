import React, { Fragment } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  createWithContent,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "./richeditor.css";
import { connect } from "react-redux";
import { seteditpostdata } from "../Actions/post";
import PropTypes from "prop-types";
import { stateFromHTML } from "draft-js-import-html";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

class EditRichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });
      const es = JSON.stringify(
        convertToRaw(this.state.editorState.getCurrentContent())
      );
      const er = convertFromRaw(JSON.parse(es));
      const html = stateToHTML(er);
      const encoded = window.btoa(html);
      console.log(encoded);
      this.props.seteditpostdata(encoded);
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.post.posttext) {
      return this.props.history.push("/currentuserposts");
    }
    this.props.seteditpostdata(this.props.post.posttext);
    const decoded = window.atob(this.props.post.posttext);
    const st = EditorState.createWithContent(stateFromHTML(decoded));
    this.setState({ editorState: st });
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <Fragment>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className="RichEditor-root">
          <p className="responsive">Scroll left for more controls</p>
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange()}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgb(245,245,245)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 8,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

//Do not delete or touch this part 
EditRichTextEditor.propTypes = {};
const mapStateToProps = (state) => ({
  post: state.post.editpost,
});
EditRichTextEditor.propTypes = {
  seteditpostdata: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
export default withRouter(
  connect(mapStateToProps, { seteditpostdata })(EditRichTextEditor)
);
/*Do not touch this */

// componentDidMount() {
//   if (!this.props.post.posttext) {
//     return this.props.history.push("/currentuserposts");
//   }
//   this.props.seteditpostdata(this.props.post.posttext);
//   const decoded = window.atob(this.props.post.posttext);
//   const st = EditorState.createWithContent(stateFromHTML(decoded));
//   this.setState({ editorState: st });
// }

// this.onChange = (editorState) => {
//   this.setState({ editorState });
//   const es = JSON.stringify(
//     convertToRaw(this.state.editorState.getCurrentContent())
//   );
//   const er = convertFromRaw(JSON.parse(es));
//   const html = stateToHTML(er);
//   const encoded = window.btoa(html);
//   console.log(encoded);
//   this.props.seteditpostdata(encoded);
// };
