/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 ******************************************************************************************************************** */
import '@testing-library/jest-dom';

// To make sure that the tests are working, it's important that you are using
// this implementation of ResizeObserver and DOMMatrixReadOnly
class ResizeObserver {
  callback: globalThis.ResizeObserverCallback;
 
  constructor(callback: globalThis.ResizeObserverCallback) {
    this.callback = callback;
  }
 
  observe(target: Element) {
    this.callback([{ target } as globalThis.ResizeObserverEntry], this);
  }
 
  unobserve() {}
 
  disconnect() {}
}
 
class DOMMatrixReadOnly {
  m22: number;
  constructor(transform: string) {
    const scale = transform?.match(/scale\(([1-9.])\)/)?.[1];
    this.m22 = scale !== undefined ? +scale : 1;
  }
}
 
// Only run the shim once when requested
let init = false;
 
export const mockReactFlow = () => {
  if (init) return;
  init = true;
 
  global.ResizeObserver = ResizeObserver;
 
  // @ts-ignore
  global.DOMMatrixReadOnly = DOMMatrixReadOnly;
 
  Object.defineProperties(global.HTMLElement.prototype, {
    offsetHeight: {
      get() {
        return parseFloat(this.style.height) || 1;
      },
    },
    offsetWidth: {
      get() {
        return parseFloat(this.style.width) || 1;
      },
    },
  });
 
  (global.SVGElement as any).prototype.getBBox = () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
};

mockReactFlow();