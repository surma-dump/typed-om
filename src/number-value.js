// Copyright 2015 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function(shared, scope) {

  function NumberValue(value) {
    this.cssString = '' + value;
    if (typeof value == 'number') {
      this.value = value;
    } else if (typeof value == 'string') { // Nick and Nat: This constructor handles cssString values, but your constructors don't need to.
      nValue = Number.parseFloat(value);
      if (!isNaN(nValue)) {
        this.value = nValue;
      } else {
        throw(new TypeError('Value of NumberValue must be a number or a numeric string.'));
      }
    } else {
      throw(new TypeError('Value of NumberValue must be a number or a numeric string.'));
    }
  }

  NumberValue.prototype = shared.StyleValue.prototype;

  scope.NumberValue = NumberValue;

})(baseClasses, window);

