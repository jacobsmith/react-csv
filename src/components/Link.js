import React from 'react';
import {buildURI, toCSV} from '../core';
import {
   defaultProps as commonDefaultProps,
   propTypes as commonPropTypes} from '../metaProps';

/**
 *
 * @example ../../sample-site/csvlink.example.md
 */
class CSVLink extends React.Component {

  static defaultProps = commonDefaultProps;
  static propTypes = commonPropTypes;

  constructor(props) {
    super(props);
    this.state = {};

    this.buildURI= this.buildURI.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.clearDownloadComponent = this.clearDownloadComponent.bind(this);
  }

  buildURI() {
    return buildURI(...arguments);
  }

/**
   * In IE11 this method will trigger the file download
   */
  handleLegacy(evt, data, headers, separator, filename) {
    // If this browser is IE 11, it does not support the `download` attribute
    if (window.navigator.msSaveOrOpenBlob) {
      // Stop the click propagation
      evt.preventDefault()

      let blob = new Blob([toCSV(data, headers, separator)])
      window.navigator.msSaveBlob(blob, filename)

      return false
    }
  }

  downloadFile(data) {
    const csvData = typeof data === 'function' ? data() : data;
    this.setState({ downloadComponent: <CSVDownload data={csvData} /> }, this.clearDownloadComponent);
  }

  clearDownloadComponent() {
    this.setState({ downloadComponent: null });
  }

  render(){
    const { data, headers, separator, filename, uFEFF, children , ...rest } = this.props;

    return (
      <a download={ filename } {...rest}
        onClick={ () => this.downloadFile(data, uFEFF, headers, separator) }>
          { children }
          { this.state.downloadComponent ? this.state.downloadComponent : null }
        </a>
    )

    // return (
    //   <a download={filename} {...rest}
    //      ref={link => (this.link = link)}
    //      href={this.buildURI(csvData, uFEFF, headers, separator)}
    //      onClick={evt => this.handleLegacy(evt, csvData, headers, separator, filename)}>
    //     {children}
    //   </a>
    // )
  }
}

export default CSVLink;
