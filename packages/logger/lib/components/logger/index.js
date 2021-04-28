import React from 'react';
import Taro from '@tarojs/taro';
import { View, ScrollView, Text } from '@tarojs/components';
import cls from 'classnames';
function getCurrentPageId() {
    const currentInstance = Taro.getCurrentInstance();
    console.log(currentInstance);
    const { page } = currentInstance;
    // 不同平台的页面 id 取值不一样
    const pageId = page.$id || page.__wxExparserNodeId__;
    return String(pageId);
}
class Logger extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            logs: [],
        };
        this.toggle = () => {
            const { show } = this.state;
            this.setState({ show: !show });
        };
        this.clear = () => {
            this.setState({ logs: [] });
        };
        this.init();
    }
    static getLogger() {
        const pageId = getCurrentPageId();
        const logger = Logger.instances[pageId];
        if (!logger) {
            throw new Error('Logger component is not found, seems it is not add to the page?');
        }
        return logger;
    }
    static log(...args) {
        const logger = this.getLogger();
        logger.handleLog('log', args);
    }
    static error(...args) {
        const logger = this.getLogger();
        logger.handleLog('error', args);
    }
    init() {
        const pageId = getCurrentPageId();
        Logger.instances[pageId] = this;
    }
    stringify(o) {
        const { beautify } = this.props;
        if (typeof o === 'undefined')
            return 'undefined';
        if (typeof o === 'string')
            return o;
        return beautify ? JSON.stringify(o, undefined, '\u00a0\u00a0') : JSON.stringify(o);
    }
    handleLog(type, args) {
        const { visible, beautify, max = Logger.LOG_MAX } = this.props;
        if (!visible)
            return;
        const logArgs = args.map((o) => {
            return this.stringify(o);
        });
        const id = `log-${Date.now()}`;
        const log = { id, type, text: logArgs.join(beautify ? '\r\n' : '\u00a0\u00a0') };
        let logs = [...this.state.logs];
        logs.push(log);
        const start = Math.max(logs.length - max, 0);
        logs = logs.slice(start);
        this.setState({ currentLogId: id, logs });
    }
    render() {
        const { className, visible } = this.props;
        const { show, currentLogId, logs } = this.state;
        if (!visible)
            return null;
        return (React.createElement(View, Object.assign({}, this.props, { className: cls('logger-view', className, { show }) }),
            React.createElement(ScrollView, { className: "logger-list", scrollY: true, scrollIntoView: currentLogId }, logs.map((log, index) => (React.createElement(Text, { key: index, id: log.id, className: cls('logger-text', log.type), style: { backgroundColor: index % 2 ? '#eee' : undefined }, selectable: true }, log.text)))),
            React.createElement(View, { className: "logger-btn btn-toggle", onClick: this.toggle }, show ? '展开' : '收起'),
            React.createElement(View, { className: "logger-btn btn-clear", onClick: this.clear }, "\u6E05\u7A7A")));
    }
}
Logger.LOG_MAX = 30;
Logger.instances = {};
Logger.defaultProps = {
    visible: false,
    beautify: true,
    max: Logger.LOG_MAX,
};
export default Logger;
//# sourceMappingURL=index.js.map