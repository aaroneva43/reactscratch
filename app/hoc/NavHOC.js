import React, { Component, createElement } from 'react'
import ReactDOM from 'react-dom'

import { Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import _ from 'lodash';

const getNodeByPath = (node, path) => {

    let n = _.isArray(node) ? { children: node } : node;

    let paths = (path.match(/[^\.].+[^\/]/)[0] || '').split('/');

    while (paths.length) {
        const p = paths.shift();

        n = _.find(n.children, child => child.name == p);

        if (!n) {
            break;
        }

    }

    return n;
}

const appendCollection = (node, collections) => {

    let n = _.cloneDeep(node);

    _.each(collections, (v, p) => {

        let appendPoint = getNodeByPath(n, p);
        if (appendPoint) {
            const _children = appendPoint.children;

            appendPoint.children = _.map(v, itm => ({ ...itm, children: _children }));
        }
    });

    return n;

}


export default (Cmp => ({ menuData, location }) => {
    let _menuData = _.cloneDeep(menuData);

    const collections = { 'dashboard/devices': [{ name: '3', text: '3' }, { name: '2', text: '2' }] };

    return <Cmp {...{ menuData: appendCollection(menuData, collections), location }} />;

})(Nav)