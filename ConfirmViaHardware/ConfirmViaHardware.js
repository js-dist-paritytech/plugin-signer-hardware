'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _class, _class2, _temp2; // Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _Button = require('@parity/ui/lib/Button');var _Button2 = _interopRequireDefault(_Button);
var _Form = require('semantic-ui-react/dist/commonjs/collections/Form');var _Form2 = _interopRequireDefault(_Form);
var _reactIntl = require('react-intl');
var _hardwareStore = require('@parity/shared/lib/mobx/hardwareStore');var _hardwareStore2 = _interopRequireDefault(_hardwareStore);
var _IdentityIcon = require('@parity/ui/lib/IdentityIcon');var _IdentityIcon2 = _interopRequireDefault(_IdentityIcon);
var _mobxReact = require('mobx-react');
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _lodash = require('lodash.pick');var _lodash2 = _interopRequireDefault(_lodash);

var _ConfirmViaHardware = require('./ConfirmViaHardware.css');var _ConfirmViaHardware2 = _interopRequireDefault(_ConfirmViaHardware);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var


ConfirmViaHardware = (0, _mobxReact.observer)(_class = (_temp2 = _class2 = function (_Component) {_inherits(ConfirmViaHardware, _Component);function ConfirmViaHardware() {var _ref;var _temp, _this, _ret;_classCallCheck(this, ConfirmViaHardware);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConfirmViaHardware.__proto__ || Object.getPrototypeOf(ConfirmViaHardware)).call.apply(_ref, [this].concat(args))), _this), _this.











    state = {
      isSending: false,
      error: null }, _this.


    hardwareStore = _hardwareStore2.default.get(_this.context.api), _this.

    handleConfirm = function () {var
      api = _this.context.api;var _this$props =
      _this.props,request = _this$props.request,transaction = _this$props.transaction;

      if (!transaction) {
        // Handle signing messages and decrypting with hardware wallet is not supported yet
        // request.sign is not empty if request was `eth_sign`
        // request.decrypt is not empty if request was ``parity_decryptMessage`
        // promise = ... // TODO
        _this.setState({ error: 'Signing and decrypting messages is not yet supported with hardware wallets' });
        return;
      }

      _this.setState({ isSending: true });

      return api.signer.
      confirmRequest(request.id, (0, _lodash2.default)(transaction, ['condition', 'gas', 'gasPrice']), '').
      then(function () {
        _this.setState({ isSending: false });
      }).
      catch(function (error) {
        _this.setState({
          isSending: false,
          error: error && error.text });

      });
    }, _temp), _possibleConstructorReturn(_this, _ret);}_createClass(ConfirmViaHardware, [{ key: 'render', value: function render()

    {var _props =
      this.props,address = _props.address,isDisabled = _props.isDisabled;var
      isSending = this.state.isSending;
      var _isDisabled = isDisabled || !this.hardwareStore.isConnected(address);

      return (
        _react2.default.createElement('div', { className: _ConfirmViaHardware2.default.confirmForm },
          _react2.default.createElement(_Form2.default, null,
            this.renderHint(),
            this.renderError(),
            _react2.default.createElement('div', { 'data-effect': 'solid', 'data-for': 'transactionConfirmForm' + this.id, 'data-place': 'bottom', 'data-tip': true },
              _react2.default.createElement(_Button2.default, {
                className: _ConfirmViaHardware2.default.confirmButton,
                isDisabled: _isDisabled || isSending,
                fullWidth: true,
                icon: _react2.default.createElement(_IdentityIcon2.default, { address: address, button: true, className: _ConfirmViaHardware2.default.signerIcon }),
                label:
                isSending ?
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'signer.txPendingConfirm.buttons.confirmBusy', defaultMessage: 'Confirming...' }) :

                _react2.default.createElement(_reactIntl.FormattedMessage, {
                  id: 'signer.txPendingConfirm.buttons.confirmRequest',
                  defaultMessage: 'Confirm Request' }),



                onClick: this.handleConfirm })))));





    } }, { key: 'renderError', value: function renderError()

    {var
      error = this.state.error;

      return _react2.default.createElement('div', { className: _ConfirmViaHardware2.default.error }, error);
    } }, { key: 'renderHint', value: function renderHint()

    {var _props2 =
      this.props,address = _props2.address,isDisabled = _props2.isDisabled;var
      isSending = this.state.isSending;
      var _isDisabled = isDisabled || !this.hardwareStore.isConnected(address);

      if (isSending) {
        return (
          _react2.default.createElement('div', { className: _ConfirmViaHardware2.default.passwordHint },
            _react2.default.createElement(_reactIntl.FormattedMessage, {
              id: 'signer.sending.hardware.confirm',
              defaultMessage: 'Please confirm the transaction on your attached hardware device' })));



      } else if (_isDisabled) {
        return (
          _react2.default.createElement('div', { className: _ConfirmViaHardware2.default.passwordHint },
            _react2.default.createElement(_reactIntl.FormattedMessage, {
              id: 'signer.sending.hardware.connect',
              defaultMessage: 'Please attach your hardware device before confirming the transaction' })));



      }

      return (
        _react2.default.createElement('div', { className: _ConfirmViaHardware2.default.passwordHint },
          _react2.default.createElement(_reactIntl.FormattedMessage, {
            id: 'signer.sending.hardware.next',
            defaultMessage: 'Please start the hardware confirmation process via the button below' })));



    } }]);return ConfirmViaHardware;}(_react.Component), _class2.contextTypes = { api: _propTypes2.default.object.isRequired }, _class2.propTypes = { address: _propTypes2.default.string.isRequired, isDisabled: _propTypes2.default.bool, request: _propTypes2.default.object.isRequired, transaction: _propTypes2.default.object }, _temp2)) || _class;exports.default =


ConfirmViaHardware;