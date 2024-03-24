import React from 'react';
import DOMParserReact, { parse } from 'dom-parser-react'
import NavBar from '../components/NavBar';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      content: this.props.content,
      id: this.props.blog_id,
    };
  }

  render() {
    return (
      <>
        <NavBar />
        <a href={"/blog/" + this.state.id + "/edit"}>Edit Blog</a>
        <h1>{this.state.title}</h1>
        <div>
            <DOMParserReact source={this.state.content} />
        </div>
      </>
    );
  }
}

export default BlogPage;