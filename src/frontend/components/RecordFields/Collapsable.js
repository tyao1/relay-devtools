/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

import type {Path} from '../../util/types';

import React from 'react';
import PropTypes from 'prop-types';

type Props = {|
  path: Path,
  header: React$Node,
  children: React$Node,
|};

export default class Collapsable extends React.Component<Props> {
  static contextTypes = {
    isPathOpened: PropTypes.func,
    openOrClosePath: PropTypes.func,
  };

  render() {
    const {path, children, header} = this.props;
    const opened = Boolean(this.context.isPathOpened(path));

    const childrenElements = opened ? children : null;
    return (
      <div className="collapsable">
        <span
          role="button"
          className="collapse-button"
          data-opened={opened}
          onClick={this._toggle}>
          {header}
        </span>
        {childrenElements}
      </div>
    );
  }

  _toggle = (e: SyntheticEvent<EventTarget>) => {
    this.context.openOrClosePath(this.props.path);
    e.stopPropagation();
  };
}
