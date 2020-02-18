// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/* on installation */

chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: chrome.extension.getURL("options.html")
    });
  }
});

const searchMyTwitter = (username, text) => {
  chrome.tabs.create({
    url: `https://twitter.com/search?q=from%3A${username}%20${text}&src=typed_query`
  });
}

let menuCreated = false;

const readyExtension = () => {
  chrome.storage.sync.get(['username'], (res) => {
    const handle = res['username'];

    const menuConfig = {
      title: `Search my tweets as @${handle} for this keyword`,
      contexts:["selection"],
      onclick: (e) => searchMyTwitter(handle, e.selectionText),
    };

    if (menuCreated) {
      chrome.contextMenus.update("search-me", menuConfig);
    } else {
      chrome.contextMenus.create({
        id: "search-me",
        ...menuConfig
      }, () => {
        menuCreated = true;
      });
    }
  });
}

chrome.tabs.onCreated.addListener(readyExtension);
