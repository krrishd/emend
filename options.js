// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let usernameInput = document.getElementById('handle');

chrome.storage.sync.get(['username'], (res) => {
  usernameInput.value = res['username'];
});

usernameInput.addEventListener('change', (e) => {
  chrome.storage.sync.set({
    username: e.target.value,
  }, () => console.log('username changed to', e.target.value));
});
