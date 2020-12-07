(function () {
  'use strict';

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  if (!Math.hypot) Math.hypot = function () {
    var y = 0,
        i = arguments.length;

    while (i--) {
      y += arguments[i] * arguments[i];
    }

    return Math.sqrt(y);
  };

  /**
   * 3x3 Matrix
   * @module mat3
   */

  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */

  function create() {
    var out = new ARRAY_TYPE(9);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }

    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }
  /**
   * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {ReadonlyMat4} a Mat4 to derive the normal matrix from
   *
   * @returns {mat3} out
   */

  function normalFromMat4(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create$1() {
    var out = new ARRAY_TYPE(16);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }

    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 initialized with values from an existing matrix
   *
   * @param {ReadonlyMat4} a matrix to clone
   * @returns {mat4} a new 4x4 matrix
   */

  function clone(a) {
    var out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Copy the values from one mat4 to another
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Create a new mat4 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} A new mat4
   */

  function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  /**
   * Set the components of a mat4 to the given values
   *
   * @param {mat4} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} out
   */

  function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */

  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Transpose the values of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
      var a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      var a12 = a[6],
          a13 = a[7];
      var a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }

    return out;
  }
  /**
   * Inverts a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function invert(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  /**
   * Calculates the adjugate of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function adjoint(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
  }
  /**
   * Calculates the determinant of a mat4
   *
   * @param {ReadonlyMat4} a the source matrix
   * @returns {Number} determinant of a
   */

  function determinant(a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */

  function multiply(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to translate
   * @param {ReadonlyVec3} v vector to translate by
   * @returns {mat4} out
   */

  function translate(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  }
  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to scale
   * @param {ReadonlyVec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/

  function scale(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {ReadonlyVec3} axis the axis to rotate around
   * @returns {mat4} out
   */

  function rotate(out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;

    if (len < EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11]; // Construct the elements of the rotation matrix

    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    return out;
  }
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateZ(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyVec3} v Translation vector
   * @returns {mat4} out
   */

  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.scale(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyVec3} v Scaling vector
   * @returns {mat4} out
   */

  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a given angle around a given axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @param {ReadonlyVec3} axis the axis to rotate around
   * @returns {mat4} out
   */

  function fromRotation(out, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;

    if (len < EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c; // Perform rotation-specific matrix multiplication

    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the X axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateX(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function fromXRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the Y axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateY(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function fromYRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the Z axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateZ(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function fromZRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @returns {mat4} out
   */

  function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 from a dual quat.
   *
   * @param {mat4} out Matrix
   * @param {ReadonlyQuat2} a Dual Quaternion
   * @returns {mat4} mat4 receiving operation result
   */

  function fromQuat2(out, a) {
    var translation = new ARRAY_TYPE(3);
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7];
    var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

    if (magnitude > 0) {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }

    fromRotationTranslation(out, a, translation);
    return out;
  }
  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive translation component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */

  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  /**
   * Returns the scaling factor component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslationScale
   *  with a normalized Quaternion paramter, the returned vector will be
   *  the same as the scaling vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive scaling factor component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */

  function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }
  /**
   * Returns a quaternion representing the rotational component
   *  of a transformation matrix. If a matrix is built with
   *  fromRotationTranslation, the returned quaternion will be the
   *  same as the quaternion originally supplied.
   * @param {quat} out Quaternion to receive the rotation component
   * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {quat} out
   */

  function getRotation(out, mat) {
    var scaling = new ARRAY_TYPE(3);
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }

    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @param {ReadonlyVec3} s Scaling vector
   * @returns {mat4} out
   */

  function fromRotationTranslationScale(out, q, v, s) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     mat4.translate(dest, origin);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *     mat4.translate(dest, negativeOrigin);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @param {ReadonlyVec3} s Scaling vector
   * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
   * @returns {mat4} out
   */

  function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    var ox = o[0];
    var oy = o[1];
    var oz = o[2];
    var out0 = (1 - (yy + zz)) * sx;
    var out1 = (xy + wz) * sx;
    var out2 = (xz - wy) * sx;
    var out4 = (xy - wz) * sy;
    var out5 = (1 - (xx + zz)) * sy;
    var out6 = (yz + wx) * sy;
    var out8 = (xz + wy) * sz;
    var out9 = (yz - wx) * sz;
    var out10 = (1 - (xx + yy)) * sz;
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;
    return out;
  }
  /**
   * Calculates a 4x4 matrix from the given quaternion
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyQuat} q Quaternion to create matrix from
   *
   * @returns {mat4} out
   */

  function fromQuat(out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a frustum matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Number} left Left bound of the frustum
   * @param {Number} right Right bound of the frustum
   * @param {Number} bottom Bottom bound of the frustum
   * @param {Number} top Top bound of the frustum
   * @param {Number} near Near bound of the frustum
   * @param {Number} far Far bound of the frustum
   * @returns {mat4} out
   */

  function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */

  function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
  }
  /**
   * Generates a perspective projection matrix with the given field of view.
   * This is primarily useful for generating projection matrices to be used
   * with the still experiemental WebVR API.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */

  function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
    var xScale = 2.0 / (leftTan + rightTan);
    var yScale = 2.0 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = far * near / (near - far);
    out[15] = 0.0;
    return out;
  }
  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */

  function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {ReadonlyVec3} eye Position of the viewer
   * @param {ReadonlyVec3} center Point the viewer is looking at
   * @param {ReadonlyVec3} up vec3 pointing up
   * @returns {mat4} out
   */

  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];

    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);

    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);

    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
  /**
   * Generates a matrix that makes something look at something else.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {ReadonlyVec3} eye Position of the viewer
   * @param {ReadonlyVec3} center Point the viewer is looking at
   * @param {ReadonlyVec3} up vec3 pointing up
   * @returns {mat4} out
   */

  function targetTo(out, eye, target, up) {
    var eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2];
    var z0 = eyex - target[0],
        z1 = eyey - target[1],
        z2 = eyez - target[2];
    var len = z0 * z0 + z1 * z1 + z2 * z2;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      z0 *= len;
      z1 *= len;
      z2 *= len;
    }

    var x0 = upy * z2 - upz * z1,
        x1 = upz * z0 - upx * z2,
        x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }
  /**
   * Returns a string representation of a mat4
   *
   * @param {ReadonlyMat4} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */

  function str(a) {
    return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
  }
  /**
   * Returns Frobenius norm of a mat4
   *
   * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */

  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
  }
  /**
   * Adds two mat4's
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */

  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */

  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat4} out
   */

  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }
  /**
   * Adds two mat4's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat4} out the receiving vector
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat4} out
   */

  function multiplyScalarAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    out[9] = a[9] + b[9] * scale;
    out[10] = a[10] + b[10] * scale;
    out[11] = a[11] + b[11] * scale;
    out[12] = a[12] + b[12] * scale;
    out[13] = a[13] + b[13] * scale;
    out[14] = a[14] + b[14] * scale;
    out[15] = a[15] + b[15] * scale;
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyMat4} a The first matrix.
   * @param {ReadonlyMat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */

  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {ReadonlyMat4} a The first matrix.
   * @param {ReadonlyMat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */

  function equals(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7];
    var a8 = a[8],
        a9 = a[9],
        a10 = a[10],
        a11 = a[11];
    var a12 = a[12],
        a13 = a[13],
        a14 = a[14],
        a15 = a[15];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    var b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7];
    var b8 = b[8],
        b9 = b[9],
        b10 = b[10],
        b11 = b[11];
    var b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
  }
  /**
   * Alias for {@link mat4.multiply}
   * @function
   */

  var mul = multiply;
  /**
   * Alias for {@link mat4.subtract}
   * @function
   */

  var sub = subtract;

  var mat4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$1,
    clone: clone,
    copy: copy,
    fromValues: fromValues,
    set: set,
    identity: identity,
    transpose: transpose,
    invert: invert,
    adjoint: adjoint,
    determinant: determinant,
    multiply: multiply,
    translate: translate,
    scale: scale,
    rotate: rotate,
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ,
    fromTranslation: fromTranslation,
    fromScaling: fromScaling,
    fromRotation: fromRotation,
    fromXRotation: fromXRotation,
    fromYRotation: fromYRotation,
    fromZRotation: fromZRotation,
    fromRotationTranslation: fromRotationTranslation,
    fromQuat2: fromQuat2,
    getTranslation: getTranslation,
    getScaling: getScaling,
    getRotation: getRotation,
    fromRotationTranslationScale: fromRotationTranslationScale,
    fromRotationTranslationScaleOrigin: fromRotationTranslationScaleOrigin,
    fromQuat: fromQuat,
    frustum: frustum,
    perspective: perspective,
    perspectiveFromFieldOfView: perspectiveFromFieldOfView,
    ortho: ortho,
    lookAt: lookAt,
    targetTo: targetTo,
    str: str,
    frob: frob,
    add: add,
    subtract: subtract,
    multiplyScalar: multiplyScalar,
    multiplyScalarAndAdd: multiplyScalarAndAdd,
    exactEquals: exactEquals,
    equals: equals,
    mul: mul,
    sub: sub
  });

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  function create$2() {
    var out = new ARRAY_TYPE(3);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec3 initialized with values from an existing vector
   *
   * @param {ReadonlyVec3} a vector to clone
   * @returns {vec3} a new 3D vector
   */

  function clone$1(a) {
    var out = new ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */

  function fromValues$1(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Copy the values from one vec3 to another
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the source vector
   * @returns {vec3} out
   */

  function copy$1(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Scales a vec3 by a scalar number
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec3} out
   */

  function scale$1(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach = function () {
    var vec = create$2();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  }();

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */

  function create$3() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }

    return out;
  }
  /**
   * Transforms the vec4 with a mat4.
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the vector to transform
   * @param {ReadonlyMat4} m matrix to transform with
   * @returns {vec4} out
   */

  function transformMat4(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  }
  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$1 = function () {
    var vec = create$3();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 4;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }

      return a;
    };
  }();

  let VertexShader = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;

    uniform mat4 uPMatrix;
    uniform mat4 uMVMatrix;
    uniform mat3 uNMatrix;

    varying vec3 vNormal;

    void main(){
        // Calculte vertex position in eye coordinates. 
        vec4 tPosition = uMVMatrix * vec4(aPosition, 1.0);
        // Calculate projektion.
        gl_Position = uPMatrix * tPosition;

        vec3 tNormal = normalize(uNMatrix * aNormal);
        tNormal = uNMatrix * aNormal;
        
        vNormal = tNormal;
    }
`;

  let FragmentShader = `
    precision mediump float;

    varying vec3 vNormal;

    // Material.
    struct PhongMaterial {
        vec3 ka;
        vec3 kd;
        vec3 ks;
        float ke;
    };
    uniform PhongMaterial material;

    // Ambient light.
    uniform vec3 ambientLight;

    vec3 camLight(vec3 n) {

        vec3 ambient = material.ka * ambientLight;

        vec3 s = vec3(0,0,1);
        float sn = max( dot(s,n), 0.0);
        vec3 diffuse = material.kd * sn;

        return ambient + diffuse;
    }

    void main() {
        vec3 vNormal = normalize(vNormal);
        gl_FragColor = vec4(camLight(vNormal), 1.0);
    }
`;

  let Sphere = (function () {

  	function createVertexData() {
  		let n = 30;
  		let m = 30;

  		// Positions.
  		this.vertices = new Float32Array(3 * (n + 1) * (m + 1));
  		let vertices = this.vertices;
  		// Normals.
  		this.normals = new Float32Array(3 * (n + 1) * (m + 1));
  		let normals = this.normals;
  		// Index data.
  		this.indicesLines = new Uint16Array(2 * 2 * n * m);
  		let indicesLines = this.indicesLines;
  		this.indicesTris = new Uint16Array(3 * 2 * n * m);
  		let indicesTris = this.indicesTris;

  		// Texture.
  		this.textureCoord = new Float32Array(2 * (n + 1) * (m + 1));
  		let textureCoord = this.textureCoord;

  		let du = 2 * Math.PI / n;
  		let dv = Math.PI / m;
  		let r = 1;
  		// Counter for entries in index array.
  		let iLines = 0;
  		let iTris = 0;

  		// Loop angle u.
  		for (let i = 0, u = 0; i <= n; i++, u += du) {
  			// Loop angle v.
  			for (let j = 0, v = 0; j <= m; j++, v += dv) {

  				let iVertex = i * (m + 1) + j;

  				let x = r * Math.sin(v) * Math.cos(u);
  				let y = r * Math.sin(v) * Math.sin(u);
  				let z = r * Math.cos(v);

  				// Set vertex positions.
  				vertices[iVertex * 3] = x;
  				vertices[iVertex * 3 + 1] = y;
  				vertices[iVertex * 3 + 2] = z;

  				// Calc and set normals.
  				let vertexLength = Math.sqrt(x * x + y * y + z * z);
  				normals[iVertex * 3] = x / vertexLength;
  				normals[iVertex * 3 + 1] = y / vertexLength;
  				normals[iVertex * 3 + 2] = z / vertexLength;

  				// Set index.
  				// Line on beam.
  				if (j > 0 && i > 0) {
  					indicesLines[iLines++] = iVertex - 1;
  					indicesLines[iLines++] = iVertex;
  				}
  				// Line on ring.
  				if (j > 0 && i > 0) {
  					indicesLines[iLines++] = iVertex - (m + 1);
  					indicesLines[iLines++] = iVertex;
  				}

  				// Set index.
  				// Two Triangles.
  				if (j > 0 && i > 0) {
  					indicesTris[iTris++] = iVertex;
  					indicesTris[iTris++] = iVertex - 1;
  					indicesTris[iTris++] = iVertex - (m + 1);
  					//
  					indicesTris[iTris++] = iVertex - 1;
  					indicesTris[iTris++] = iVertex - (m + 1) - 1;
  					indicesTris[iTris++] = iVertex - (m + 1);
  				}

  				textureCoord[iVertex * 2] = u / (2 * Math.PI); // s
  				textureCoord[iVertex * 2 + 1] = v / Math.PI; // t
  			}
  		}
  		return { vertices: vertices, normals: normals, indicesLines: indicesLines, indicesTris: indicesTris, textureCoord: textureCoord };
  	}

  	return {
  		createVertexData: createVertexData
  	}

  }());

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var domain;

  // This constructor is used to store event handlers. Instantiating this is
  // faster than explicitly calling `Object.create(null)` to get a "clean" empty
  // object (tested with v8 v4.9).
  function EventHandlers() {}
  EventHandlers.prototype = Object.create(null);

  function EventEmitter() {
    EventEmitter.init.call(this);
  }

  // nodejs oddity
  // require('events') === require('events').EventEmitter
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.usingDomains = false;

  EventEmitter.prototype.domain = undefined;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;

  EventEmitter.init = function() {
    this.domain = null;
    if (EventEmitter.usingDomains) {
      // if there is an active domain, then attach to it.
      if (domain.active ) ;
    }

    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n))
      throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  // These standalone emit* functions are used to optimize calling of event
  // handlers for fast cases because emit() itself often has a variable number of
  // arguments and can be deoptimized because of that. These functions always have
  // the same number of arguments and thus do not get deoptimized, so the code
  // inside them can execute faster.
  function emitNone(handler, isFn, self) {
    if (isFn)
      handler.call(self);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self);
    }
  }
  function emitOne(handler, isFn, self, arg1) {
    if (isFn)
      handler.call(self, arg1);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1);
    }
  }
  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn)
      handler.call(self, arg1, arg2);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1, arg2);
    }
  }
  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn)
      handler.call(self, arg1, arg2, arg3);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1, arg2, arg3);
    }
  }

  function emitMany(handler, isFn, self, args) {
    if (isFn)
      handler.apply(self, args);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].apply(self, args);
    }
  }

  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var doError = (type === 'error');

    events = this._events;
    if (events)
      doError = (doError && events.error == null);
    else if (!doError)
      return false;

    domain = this.domain;

    // If there is no 'error' event listener then throw.
    if (doError) {
      er = arguments[1];
      if (domain) {
        if (!er)
          er = new Error('Uncaught, unspecified "error" event');
        er.domainEmitter = this;
        er.domain = domain;
        er.domainThrown = false;
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
      return false;
    }

    handler = events[type];

    if (!handler)
      return false;

    var isFn = typeof handler === 'function';
    len = arguments.length;
    switch (len) {
      // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;
      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;
      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;
      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
      // slower
      default:
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        emitMany(handler, isFn, this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');

    events = target._events;
    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener) {
        target.emit('newListener', type,
                    listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (!existing) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] :
                                            [existing, listener];
      } else {
        // If we've already got an array, just append.
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      }

      // Check for listener leak
      if (!existing.warned) {
        m = $getMaxListeners(target);
        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error('Possible EventEmitter memory leak detected. ' +
                              existing.length + ' ' + type + ' listeners added. ' +
                              'Use emitter.setMaxListeners() to increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }

    return target;
  }
  function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

  function _onceWrap(target, type, listener) {
    var fired = false;
    function g() {
      target.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }
    g.listener = listener;
    return g;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');

        events = this._events;
        if (!events)
          return this;

        list = events[type];
        if (!list)
          return this;

        if (list === listener || (list.listener && list.listener === listener)) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length; i-- > 0;) {
            if (list[i] === listener ||
                (list[i].listener && list[i].listener === listener)) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (list.length === 1) {
            list[0] = undefined;
            if (--this._eventsCount === 0) {
              this._events = new EventHandlers();
              return this;
            } else {
              delete events[type];
            }
          } else {
            spliceOne(list, position);
          }

          if (events.removeListener)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

  EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events;

        events = this._events;
        if (!events)
          return this;

        // not listening for removeListener, no need to emit
        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = new EventHandlers();
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = new EventHandlers();
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          for (var i = 0, key; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = new EventHandlers();
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners) {
          // LIFO order
          do {
            this.removeListener(type, listeners[listeners.length - 1]);
          } while (listeners[0]);
        }

        return this;
      };

  EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;

    if (!events)
      ret = [];
    else {
      evlistener = events[type];
      if (!evlistener)
        ret = [];
      else if (typeof evlistener === 'function')
        ret = [evlistener.listener || evlistener];
      else
        ret = unwrapListeners(evlistener);
    }

    return ret;
  };

  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;

    if (events) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };

  // About 1.5x faster than the two-arg version of Array#splice().
  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
      list[i] = list[k];
    list.pop();
  }

  function arrayClone(arr, i) {
    var copy = new Array(i);
    while (i--)
      copy[i] = arr[i];
    return copy;
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  var global$1 = (typeof global !== "undefined" ? global :
              typeof self !== "undefined" ? self :
              typeof window !== "undefined" ? window : {});

  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
  var inited = false;
  function init () {
    inited = true;
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }

    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;
  }

  function toByteArray (b64) {
    if (!inited) {
      init();
    }
    var i, j, l, tmp, placeHolders, arr;
    var len = b64.length;

    if (len % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(len * 3 / 4 - placeHolders);

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? len - 4 : len;

    var L = 0;

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
      arr[L++] = (tmp >> 16) & 0xFF;
      arr[L++] = (tmp >> 8) & 0xFF;
      arr[L++] = tmp & 0xFF;
    }

    if (placeHolders === 2) {
      tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
      arr[L++] = tmp & 0xFF;
    } else if (placeHolders === 1) {
      tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
      arr[L++] = (tmp >> 8) & 0xFF;
      arr[L++] = tmp & 0xFF;
    }

    return arr
  }

  function tripletToBase64 (num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
  }

  function encodeChunk (uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
      output.push(tripletToBase64(tmp));
    }
    return output.join('')
  }

  function fromByteArray (uint8) {
    if (!inited) {
      init();
    }
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
    var output = '';
    var parts = [];
    var maxChunkLength = 16383; // must be multiple of 3

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      output += lookup[tmp >> 2];
      output += lookup[(tmp << 4) & 0x3F];
      output += '==';
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
      output += lookup[tmp >> 10];
      output += lookup[(tmp >> 4) & 0x3F];
      output += lookup[(tmp << 2) & 0x3F];
      output += '=';
    }

    parts.push(output);

    return parts.join('')
  }

  function read (buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? (nBytes - 1) : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];

    i += d;

    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : ((s ? -1 : 1) * Infinity)
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
  }

  function write (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
    var i = isLE ? 0 : (nBytes - 1);
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

    value = Math.abs(value);

    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }

      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }

    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

    buffer[offset + i - d] |= s * 128;
  }

  var toString = {}.toString;

  var isArray = Array.isArray || function (arr) {
    return toString.call(arr) == '[object Array]';
  };

  var INSPECT_MAX_BYTES = 50;

  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Use Object implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * Due to various browser bugs, sometimes the Object implementation will be used even
   * when the browser supports typed arrays.
   *
   * Note:
   *
   *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
   *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
   *
   *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
   *
   *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
   *     incorrect length in some situations.

   * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
   * get the Object implementation, which is slower but behaves correctly.
   */
  Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
    ? global$1.TYPED_ARRAY_SUPPORT
    : true;

  function kMaxLength () {
    return Buffer.TYPED_ARRAY_SUPPORT
      ? 0x7fffffff
      : 0x3fffffff
  }

  function createBuffer (that, length) {
    if (kMaxLength() < length) {
      throw new RangeError('Invalid typed array length')
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = new Uint8Array(length);
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      if (that === null) {
        that = new Buffer(length);
      }
      that.length = length;
    }

    return that
  }

  /**
   * The Buffer constructor returns instances of `Uint8Array` that have their
   * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
   * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
   * and the `Uint8Array` methods. Square bracket notation works as expected -- it
   * returns a single octet.
   *
   * The `Uint8Array` prototype remains unmodified.
   */

  function Buffer (arg, encodingOrOffset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
      return new Buffer(arg, encodingOrOffset, length)
    }

    // Common case.
    if (typeof arg === 'number') {
      if (typeof encodingOrOffset === 'string') {
        throw new Error(
          'If encoding is specified then the first argument must be a string'
        )
      }
      return allocUnsafe(this, arg)
    }
    return from(this, arg, encodingOrOffset, length)
  }

  Buffer.poolSize = 8192; // not used by this implementation

  // TODO: Legacy, not needed anymore. Remove in next major version.
  Buffer._augment = function (arr) {
    arr.__proto__ = Buffer.prototype;
    return arr
  };

  function from (that, value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('"value" argument must not be a number')
    }

    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length)
    }

    if (typeof value === 'string') {
      return fromString(that, value, encodingOrOffset)
    }

    return fromObject(that, value)
  }

  /**
   * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
   * if value is a number.
   * Buffer.from(str[, encoding])
   * Buffer.from(array)
   * Buffer.from(buffer)
   * Buffer.from(arrayBuffer[, byteOffset[, length]])
   **/
  Buffer.from = function (value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length)
  };

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;
  }

  function assertSize (size) {
    if (typeof size !== 'number') {
      throw new TypeError('"size" argument must be a number')
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative')
    }
  }

  function alloc (that, size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(that, size)
    }
    if (fill !== undefined) {
      // Only pay attention to encoding if it's a string. This
      // prevents accidentally sending in a number that would
      // be interpretted as a start offset.
      return typeof encoding === 'string'
        ? createBuffer(that, size).fill(fill, encoding)
        : createBuffer(that, size).fill(fill)
    }
    return createBuffer(that, size)
  }

  /**
   * Creates a new filled Buffer instance.
   * alloc(size[, fill[, encoding]])
   **/
  Buffer.alloc = function (size, fill, encoding) {
    return alloc(null, size, fill, encoding)
  };

  function allocUnsafe (that, size) {
    assertSize(size);
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }
    return that
  }

  /**
   * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
   * */
  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(null, size)
  };
  /**
   * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
   */
  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(null, size)
  };

  function fromString (that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
      encoding = 'utf8';
    }

    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding')
    }

    var length = byteLength(string, encoding) | 0;
    that = createBuffer(that, length);

    var actual = that.write(string, encoding);

    if (actual !== length) {
      // Writing a hex string, for example, that contains invalid characters will
      // cause everything after the first invalid character to be ignored. (e.g.
      // 'abxxcd' will be treated as 'ab')
      that = that.slice(0, actual);
    }

    return that
  }

  function fromArrayLike (that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    that = createBuffer(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that
  }

  function fromArrayBuffer (that, array, byteOffset, length) {
    array.byteLength; // this throws if `array` is not a valid ArrayBuffer

    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('\'offset\' is out of bounds')
    }

    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('\'length\' is out of bounds')
    }

    if (byteOffset === undefined && length === undefined) {
      array = new Uint8Array(array);
    } else if (length === undefined) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = array;
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      that = fromArrayLike(that, array);
    }
    return that
  }

  function fromObject (that, obj) {
    if (internalIsBuffer(obj)) {
      var len = checked(obj.length) | 0;
      that = createBuffer(that, len);

      if (that.length === 0) {
        return that
      }

      obj.copy(that, 0, 0, len);
      return that
    }

    if (obj) {
      if ((typeof ArrayBuffer !== 'undefined' &&
          obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
        if (typeof obj.length !== 'number' || isnan(obj.length)) {
          return createBuffer(that, 0)
        }
        return fromArrayLike(that, obj)
      }

      if (obj.type === 'Buffer' && isArray(obj.data)) {
        return fromArrayLike(that, obj.data)
      }
    }

    throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
  }

  function checked (length) {
    // Note: cannot use `length < kMaxLength()` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= kMaxLength()) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                           'size: 0x' + kMaxLength().toString(16) + ' bytes')
    }
    return length | 0
  }
  Buffer.isBuffer = isBuffer;
  function internalIsBuffer (b) {
    return !!(b != null && b._isBuffer)
  }

  Buffer.compare = function compare (a, b) {
    if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
      throw new TypeError('Arguments must be Buffers')
    }

    if (a === b) return 0

    var x = a.length;
    var y = b.length;

    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  Buffer.isEncoding = function isEncoding (encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true
      default:
        return false
    }
  };

  Buffer.concat = function concat (list, length) {
    if (!isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }

    if (list.length === 0) {
      return Buffer.alloc(0)
    }

    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }

    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (!internalIsBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
      buf.copy(buffer, pos);
      pos += buf.length;
    }
    return buffer
  };

  function byteLength (string, encoding) {
    if (internalIsBuffer(string)) {
      return string.length
    }
    if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
        (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength
    }
    if (typeof string !== 'string') {
      string = '' + string;
    }

    var len = string.length;
    if (len === 0) return 0

    // Use a for loop to avoid recursion
    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return len
        case 'utf8':
        case 'utf-8':
        case undefined:
          return utf8ToBytes(string).length
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2
        case 'hex':
          return len >>> 1
        case 'base64':
          return base64ToBytes(string).length
        default:
          if (loweredCase) return utf8ToBytes(string).length // assume utf8
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;

  function slowToString (encoding, start, end) {
    var loweredCase = false;

    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.

    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
      start = 0;
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
      return ''
    }

    if (end === undefined || end > this.length) {
      end = this.length;
    }

    if (end <= 0) {
      return ''
    }

    // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;

    if (end <= start) {
      return ''
    }

    if (!encoding) encoding = 'utf8';

    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end)

        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end)

        case 'ascii':
          return asciiSlice(this, start, end)

        case 'latin1':
        case 'binary':
          return latin1Slice(this, start, end)

        case 'base64':
          return base64Slice(this, start, end)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  }

  // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
  // Buffer instances.
  Buffer.prototype._isBuffer = true;

  function swap (b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }

  Buffer.prototype.swap16 = function swap16 () {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 16-bits')
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this
  };

  Buffer.prototype.swap32 = function swap32 () {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 32-bits')
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this
  };

  Buffer.prototype.swap64 = function swap64 () {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 64-bits')
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this
  };

  Buffer.prototype.toString = function toString () {
    var length = this.length | 0;
    if (length === 0) return ''
    if (arguments.length === 0) return utf8Slice(this, 0, length)
    return slowToString.apply(this, arguments)
  };

  Buffer.prototype.equals = function equals (b) {
    if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
    if (this === b) return true
    return Buffer.compare(this, b) === 0
  };

  Buffer.prototype.inspect = function inspect () {
    var str = '';
    var max = INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
      if (this.length > max) str += ' ... ';
    }
    return '<Buffer ' + str + '>'
  };

  Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
    if (!internalIsBuffer(target)) {
      throw new TypeError('Argument must be a Buffer')
    }

    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
      thisStart = 0;
    }
    if (thisEnd === undefined) {
      thisEnd = this.length;
    }

    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError('out of range index')
    }

    if (thisStart >= thisEnd && start >= end) {
      return 0
    }
    if (thisStart >= thisEnd) {
      return -1
    }
    if (start >= end) {
      return 1
    }

    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;

    if (this === target) return 0

    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);

    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);

    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
  // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
  //
  // Arguments:
  // - buffer - a Buffer to search
  // - val - a string, Buffer, or number
  // - byteOffset - an index into `buffer`; will be clamped to an int32
  // - encoding - an optional encoding, relevant is val is a string
  // - dir - true for indexOf, false for lastIndexOf
  function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1

    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) {
      byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
      byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset;  // Coerce to Number.
    if (isNaN(byteOffset)) {
      // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
      byteOffset = dir ? 0 : (buffer.length - 1);
    }

    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1
      else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1
    }

    // Normalize val
    if (typeof val === 'string') {
      val = Buffer.from(val, encoding);
    }

    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (internalIsBuffer(val)) {
      // Special case: looking for empty string/buffer always fails
      if (val.length === 0) {
        return -1
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
    } else if (typeof val === 'number') {
      val = val & 0xFF; // Search for a byte value [0-255]
      if (Buffer.TYPED_ARRAY_SUPPORT &&
          typeof Uint8Array.prototype.indexOf === 'function') {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
        }
      }
      return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
    }

    throw new TypeError('val must be string, number or Buffer')
  }

  function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;

    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase();
      if (encoding === 'ucs2' || encoding === 'ucs-2' ||
          encoding === 'utf16le' || encoding === 'utf-16le') {
        if (arr.length < 2 || val.length < 2) {
          return -1
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }

    function read (buf, i) {
      if (indexSize === 1) {
        return buf[i]
      } else {
        return buf.readUInt16BE(i * indexSize)
      }
    }

    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break
          }
        }
        if (found) return i
      }
    }

    return -1
  }

  Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1
  };

  Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
  };

  Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
  };

  function hexWrite (buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }

    // must be an even number of digits
    var strLen = string.length;
    if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed)) return i
      buf[offset + i] = parsed;
    }
    return i
  }

  function utf8Write (buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
  }

  function asciiWrite (buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length)
  }

  function latin1Write (buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length)
  }

  function base64Write (buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length)
  }

  function ucs2Write (buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
  }

  Buffer.prototype.write = function write (string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
      offset = offset | 0;
      if (isFinite(length)) {
        length = length | 0;
        if (encoding === undefined) encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      }
    // legacy write(string, encoding, offset, length) - remove in v0.13
    } else {
      throw new Error(
        'Buffer.write(string, encoding, offset[, length]) is no longer supported'
      )
    }

    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;

    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
      throw new RangeError('Attempt to write outside buffer bounds')
    }

    if (!encoding) encoding = 'utf8';

    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length)

        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length)

        case 'ascii':
          return asciiWrite(this, string, offset, length)

        case 'latin1':
        case 'binary':
          return latin1Write(this, string, offset, length)

        case 'base64':
          // Warning: maxLength not taken into account in base64Write
          return base64Write(this, string, offset, length)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };

  Buffer.prototype.toJSON = function toJSON () {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    }
  };

  function base64Slice (buf, start, end) {
    if (start === 0 && end === buf.length) {
      return fromByteArray(buf)
    } else {
      return fromByteArray(buf.slice(start, end))
    }
  }

  function utf8Slice (buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];

    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = (firstByte > 0xEF) ? 4
        : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
        : 1;

      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;

        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }
            break
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }
        }
      }

      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xFFFD;
        bytesPerSequence = 1;
      } else if (codePoint > 0xFFFF) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000;
        res.push(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }

      res.push(codePoint);
      i += bytesPerSequence;
    }

    return decodeCodePointsArray(res)
  }

  // Based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args.
  // We go 1 magnitude less, for safety
  var MAX_ARGUMENTS_LENGTH = 0x1000;

  function decodeCodePointsArray (codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    }

    // Decode in chunks to avoid "call stack size exceeded".
    var res = '';
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res
  }

  function asciiSlice (buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret
  }

  function latin1Slice (buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret
  }

  function hexSlice (buf, start, end) {
    var len = buf.length;

    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;

    var out = '';
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out
  }

  function utf16leSlice (buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res
  }

  Buffer.prototype.slice = function slice (start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;

    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }

    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }

    if (end < start) end = start;

    var newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = this.subarray(start, end);
      newBuf.__proto__ = Buffer.prototype;
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer(sliceLen, undefined);
      for (var i = 0; i < sliceLen; ++i) {
        newBuf[i] = this[i + start];
      }
    }

    return newBuf
  };

  /*
   * Need to make sure that buffer isn't trying to write out of bounds.
   */
  function checkOffset (offset, ext, length) {
    if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
  }

  Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }

    return val
  };

  Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }

    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }

    return val
  };

  Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset]
  };

  Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | (this[offset + 1] << 8)
  };

  Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return (this[offset] << 8) | this[offset + 1]
  };

  Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return ((this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16)) +
        (this[offset + 3] * 0x1000000)
  };

  Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
  };

  Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return (this[offset])
    return ((0xff - this[offset] + 1) * -1)
  };

  Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | (this[offset + 1] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | (this[offset] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
  };

  Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
  };

  Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, true, 23, 4)
  };

  Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, false, 23, 4)
  };

  Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, true, 52, 8)
  };

  Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, false, 52, 8)
  };

  function checkInt (buf, value, offset, ext, max, min) {
    if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
  }

  Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    this[offset] = (value & 0xff);
    return offset + 1
  };

  function objectWriteUInt16 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
        (littleEndian ? i : 1 - i) * 8;
    }
  }

  Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2
  };

  Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2
  };

  function objectWriteUInt32 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffffffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
    }
  }

  Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = (value >>> 24);
      this[offset + 2] = (value >>> 16);
      this[offset + 1] = (value >>> 8);
      this[offset] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4
  };

  Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4
  };

  Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = (value & 0xff);
    return offset + 1
  };

  Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2
  };

  Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2
  };

  Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
      this[offset + 2] = (value >>> 16);
      this[offset + 3] = (value >>> 24);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4
  };

  Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4
  };

  function checkIEEE754 (buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
    if (offset < 0) throw new RangeError('Index out of range')
  }

  function writeFloat (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4
  }

  Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert)
  };

  function writeDouble (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8
  }

  Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert)
  };

  // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
  Buffer.prototype.copy = function copy (target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;

    // Copy 0 bytes; we're done
    if (end === start) return 0
    if (target.length === 0 || this.length === 0) return 0

    // Fatal error conditions
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds')
    }
    if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
    if (end < 0) throw new RangeError('sourceEnd out of bounds')

    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }

    var len = end - start;
    var i;

    if (this === target && start < targetStart && targetStart < end) {
      // descending copy from end
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      // ascending copy from start
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, start + len),
        targetStart
      );
    }

    return len
  };

  // Usage:
  //    buffer.fill(number[, offset[, end]])
  //    buffer.fill(buffer[, offset[, end]])
  //    buffer.fill(string[, offset[, end]][, encoding])
  Buffer.prototype.fill = function fill (val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
      if (typeof start === 'string') {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === 'string') {
        encoding = end;
        end = this.length;
      }
      if (val.length === 1) {
        var code = val.charCodeAt(0);
        if (code < 256) {
          val = code;
        }
      }
      if (encoding !== undefined && typeof encoding !== 'string') {
        throw new TypeError('encoding must be a string')
      }
      if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding)
      }
    } else if (typeof val === 'number') {
      val = val & 255;
    }

    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError('Out of range index')
    }

    if (end <= start) {
      return this
    }

    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;

    if (!val) val = 0;

    var i;
    if (typeof val === 'number') {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = internalIsBuffer(val)
        ? val
        : utf8ToBytes(new Buffer(val, encoding).toString());
      var len = bytes.length;
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }

    return this
  };

  // HELPER FUNCTIONS
  // ================

  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

  function base64clean (str) {
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = stringtrim(str).replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return ''
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while (str.length % 4 !== 0) {
      str = str + '=';
    }
    return str
  }

  function stringtrim (str) {
    if (str.trim) return str.trim()
    return str.replace(/^\s+|\s+$/g, '')
  }

  function toHex (n) {
    if (n < 16) return '0' + n.toString(16)
    return n.toString(16)
  }

  function utf8ToBytes (string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];

    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);

      // is surrogate component
      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        // last char was a lead
        if (!leadSurrogate) {
          // no lead yet
          if (codePoint > 0xDBFF) {
            // unexpected trail
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          } else if (i + 1 === length) {
            // unpaired lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          }

          // valid lead
          leadSurrogate = codePoint;

          continue
        }

        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          leadSurrogate = codePoint;
          continue
        }

        // valid surrogate pair
        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
      } else if (leadSurrogate) {
        // valid bmp char, but last char was a lead
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
      }

      leadSurrogate = null;

      // encode utf8
      if (codePoint < 0x80) {
        if ((units -= 1) < 0) break
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0) break
        bytes.push(
          codePoint >> 0x6 | 0xC0,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0) break
        bytes.push(
          codePoint >> 0xC | 0xE0,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0) break
        bytes.push(
          codePoint >> 0x12 | 0xF0,
          codePoint >> 0xC & 0x3F | 0x80,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else {
        throw new Error('Invalid code point')
      }
    }

    return bytes
  }

  function asciiToBytes (str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray
  }

  function utf16leToBytes (str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break

      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }

    return byteArray
  }


  function base64ToBytes (str) {
    return toByteArray(base64clean(str))
  }

  function blitBuffer (src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if ((i + offset >= dst.length) || (i >= src.length)) break
      dst[i + offset] = src[i];
    }
    return i
  }

  function isnan (val) {
    return val !== val // eslint-disable-line no-self-compare
  }


  // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  function isBuffer(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
  }

  function isFastBuffer (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
  }

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;
  if (typeof global$1.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
  }
  if (typeof global$1.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  function nextTick(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  var performanceNow =
    performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() };

  var inherits;
  if (typeof Object.create === 'function'){
    inherits = function inherits(ctor, superCtor) {
      // implementation from standard node.js 'util' module
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    inherits = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
  var inherits$1 = inherits;

  var formatRegExp = /%[sdj%]/g;
  function format(f) {
    if (!isString(f)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }
      return objects.join(' ');
    }

    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x) {
      if (x === '%%') return '%';
      if (i >= len) return x;
      switch (x) {
        case '%s': return String(args[i++]);
        case '%d': return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
        default:
          return x;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += ' ' + x;
      } else {
        str += ' ' + inspect(x);
      }
    }
    return str;
  }

  // Mark that a method should not be used.
  // Returns a modified function which warns once by default.
  // If --no-deprecation is set, then it is a no-op.
  function deprecate(fn, msg) {
    // Allow for deprecating things in the process of starting up.
    if (isUndefined(global$1.process)) {
      return function() {
        return deprecate(fn, msg).apply(this, arguments);
      };
    }

    var warned = false;
    function deprecated() {
      if (!warned) {
        {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }

    return deprecated;
  }

  var debugs = {};
  var debugEnviron;
  function debuglog(set) {
    if (isUndefined(debugEnviron))
      debugEnviron =  '';
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
        var pid = 0;
        debugs[set] = function() {
          var msg = format.apply(null, arguments);
          console.error('%s %d: %s', set, pid, msg);
        };
      } else {
        debugs[set] = function() {};
      }
    }
    return debugs[set];
  }

  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */
  /* legacy: obj, showHidden, depth, colors*/
  function inspect(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      _extend(ctx, opts);
    }
    // set default options
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }

  // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
  inspect.colors = {
    'bold' : [1, 22],
    'italic' : [3, 23],
    'underline' : [4, 24],
    'inverse' : [7, 27],
    'white' : [37, 39],
    'grey' : [90, 39],
    'black' : [30, 39],
    'blue' : [34, 39],
    'cyan' : [36, 39],
    'green' : [32, 39],
    'magenta' : [35, 39],
    'red' : [31, 39],
    'yellow' : [33, 39]
  };

  // Don't use 'blue' not visible on cmd.exe
  inspect.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
  };


  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];

    if (style) {
      return '\u001b[' + inspect.colors[style][0] + 'm' + str +
             '\u001b[' + inspect.colors[style][1] + 'm';
    } else {
      return str;
    }
  }


  function stylizeNoColor(str, styleType) {
    return str;
  }


  function arrayToHash(array) {
    var hash = {};

    array.forEach(function(val, idx) {
      hash[val] = true;
    });

    return hash;
  }


  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect &&
        value &&
        isFunction(value.inspect) &&
        // Filter out the util module, it's inspect function is special
        value.inspect !== inspect &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }

    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }

    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }

    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (isError(value)
        && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
      return formatError(value);
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }
      if (isError(value)) {
        return formatError(value);
      }
    }

    var base = '', array = false, braces = ['{', '}'];

    // Make Array say that they are Array
    if (isArray$1(value)) {
      array = true;
      braces = ['[', ']'];
    }

    // Make functions say that they are functions
    if (isFunction(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    }

    // Make error with message first say the error
    if (isError(value)) {
      base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }

    ctx.seen.push(value);

    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }

    ctx.seen.pop();

    return reduceToSingleString(output, base, braces);
  }


  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize('undefined', 'undefined');
    if (isString(value)) {
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    }
    if (isNumber(value))
      return ctx.stylize('' + value, 'number');
    if (isBoolean(value))
      return ctx.stylize('' + value, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value))
      return ctx.stylize('null', 'null');
  }


  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }


  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            String(i), true));
      } else {
        output.push('');
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            key, true));
      }
    });
    return output;
  }


  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = '[' + key + ']';
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str.split('\n').map(function(line) {
              return '  ' + line;
            }).join('\n').substr(2);
          } else {
            str = '\n' + str.split('\n').map(function(line) {
              return '   ' + line;
            }).join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify('' + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name.replace(/'/g, "\\'")
                   .replace(/\\"/g, '"')
                   .replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }

    return name + ': ' + str;
  }


  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function(prev, cur) {
      if (cur.indexOf('\n') >= 0) ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
      return braces[0] +
             (base === '' ? '' : base + '\n ') +
             ' ' +
             output.join(',\n  ') +
             ' ' +
             braces[1];
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  }


  // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.
  function isArray$1(ar) {
    return Array.isArray(ar);
  }

  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }

  function isNull(arg) {
    return arg === null;
  }

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  function isString(arg) {
    return typeof arg === 'string';
  }

  function isUndefined(arg) {
    return arg === void 0;
  }

  function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
  }

  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
  }

  function isError(e) {
    return isObject(e) &&
        (objectToString(e) === '[object Error]' || e instanceof Error);
  }

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }

  function _extend(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  function BufferList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function (v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function (v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function () {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function () {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function (s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function (n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      p.data.copy(ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  // Copyright Joyent, Inc. and other Node contributors.
  var isBufferEncoding = Buffer.isEncoding
    || function(encoding) {
         switch (encoding && encoding.toLowerCase()) {
           case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
           default: return false;
         }
       };


  function assertEncoding(encoding) {
    if (encoding && !isBufferEncoding(encoding)) {
      throw new Error('Unknown encoding: ' + encoding);
    }
  }

  // StringDecoder provides an interface for efficiently splitting a series of
  // buffers into a series of JS strings without breaking apart multi-byte
  // characters. CESU-8 is handled as part of the UTF-8 encoding.
  //
  // @TODO Handling all encodings inside a single object makes it very difficult
  // to reason about this code, so it should be split up in the future.
  // @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
  // points as used by CESU-8.
  function StringDecoder(encoding) {
    this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
    assertEncoding(encoding);
    switch (this.encoding) {
      case 'utf8':
        // CESU-8 represents each of Surrogate Pair by 3-bytes
        this.surrogateSize = 3;
        break;
      case 'ucs2':
      case 'utf16le':
        // UTF-16 represents each of Surrogate Pair by 2-bytes
        this.surrogateSize = 2;
        this.detectIncompleteChar = utf16DetectIncompleteChar;
        break;
      case 'base64':
        // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
        this.surrogateSize = 3;
        this.detectIncompleteChar = base64DetectIncompleteChar;
        break;
      default:
        this.write = passThroughWrite;
        return;
    }

    // Enough space to store all bytes of a single character. UTF-8 needs 4
    // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
    this.charBuffer = new Buffer(6);
    // Number of bytes received for the current incomplete multi-byte character.
    this.charReceived = 0;
    // Number of bytes expected for the current incomplete multi-byte character.
    this.charLength = 0;
  }

  // write decodes the given buffer and returns it as JS string that is
  // guaranteed to not contain any partial multi-byte characters. Any partial
  // character found at the end of the buffer is buffered up, and will be
  // returned when calling write again with the remaining bytes.
  //
  // Note: Converting a Buffer containing an orphan surrogate to a String
  // currently works, but converting a String to a Buffer (via `new Buffer`, or
  // Buffer#write) will replace incomplete surrogates with the unicode
  // replacement character. See https://codereview.chromium.org/121173009/ .
  StringDecoder.prototype.write = function(buffer) {
    var charStr = '';
    // if our last write ended with an incomplete multibyte character
    while (this.charLength) {
      // determine how many remaining bytes this buffer has to offer for this char
      var available = (buffer.length >= this.charLength - this.charReceived) ?
          this.charLength - this.charReceived :
          buffer.length;

      // add the new bytes to the char buffer
      buffer.copy(this.charBuffer, this.charReceived, 0, available);
      this.charReceived += available;

      if (this.charReceived < this.charLength) {
        // still not enough chars in this buffer? wait for more ...
        return '';
      }

      // remove bytes belonging to the current character from the buffer
      buffer = buffer.slice(available, buffer.length);

      // get the character that was split
      charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

      // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
      var charCode = charStr.charCodeAt(charStr.length - 1);
      if (charCode >= 0xD800 && charCode <= 0xDBFF) {
        this.charLength += this.surrogateSize;
        charStr = '';
        continue;
      }
      this.charReceived = this.charLength = 0;

      // if there are no more bytes in this buffer, just emit our char
      if (buffer.length === 0) {
        return charStr;
      }
      break;
    }

    // determine and set charLength / charReceived
    this.detectIncompleteChar(buffer);

    var end = buffer.length;
    if (this.charLength) {
      // buffer the incomplete character bytes we got
      buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
      end -= this.charReceived;
    }

    charStr += buffer.toString(this.encoding, 0, end);

    var end = charStr.length - 1;
    var charCode = charStr.charCodeAt(end);
    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      var size = this.surrogateSize;
      this.charLength += size;
      this.charReceived += size;
      this.charBuffer.copy(this.charBuffer, size, 0, size);
      buffer.copy(this.charBuffer, 0, 0, size);
      return charStr.substring(0, end);
    }

    // or just emit the charStr
    return charStr;
  };

  // detectIncompleteChar determines if there is an incomplete UTF-8 character at
  // the end of the given buffer. If so, it sets this.charLength to the byte
  // length that character, and sets this.charReceived to the number of bytes
  // that are available for this character.
  StringDecoder.prototype.detectIncompleteChar = function(buffer) {
    // determine how many bytes we have to check at the end of this buffer
    var i = (buffer.length >= 3) ? 3 : buffer.length;

    // Figure out if one of the last i bytes of our buffer announces an
    // incomplete char.
    for (; i > 0; i--) {
      var c = buffer[buffer.length - i];

      // See http://en.wikipedia.org/wiki/UTF-8#Description

      // 110XXXXX
      if (i == 1 && c >> 5 == 0x06) {
        this.charLength = 2;
        break;
      }

      // 1110XXXX
      if (i <= 2 && c >> 4 == 0x0E) {
        this.charLength = 3;
        break;
      }

      // 11110XXX
      if (i <= 3 && c >> 3 == 0x1E) {
        this.charLength = 4;
        break;
      }
    }
    this.charReceived = i;
  };

  StringDecoder.prototype.end = function(buffer) {
    var res = '';
    if (buffer && buffer.length)
      res = this.write(buffer);

    if (this.charReceived) {
      var cr = this.charReceived;
      var buf = this.charBuffer;
      var enc = this.encoding;
      res += buf.slice(0, cr).toString(enc);
    }

    return res;
  };

  function passThroughWrite(buffer) {
    return buffer.toString(this.encoding);
  }

  function utf16DetectIncompleteChar(buffer) {
    this.charReceived = buffer.length % 2;
    this.charLength = this.charReceived ? 2 : 0;
  }

  function base64DetectIncompleteChar(buffer) {
    this.charReceived = buffer.length % 3;
    this.charLength = this.charReceived ? 3 : 0;
  }

  Readable.ReadableState = ReadableState;

  var debug = debuglog('stream');
  inherits$1(Readable, EventEmitter);

  function prependListener(emitter, event, fn) {
    // Sadly this is not cacheable as some libraries bundle their own
    // event emitter implementation with them.
    if (typeof emitter.prependListener === 'function') {
      return emitter.prependListener(event, fn);
    } else {
      // This is a hack to make sure that our error handler is attached before any
      // userland ones.  NEVER DO THIS. This is here only because this code needs
      // to continue to work with older versions of Node.js that do not include
      // the prependListener() method. The goal is to eventually remove this hack.
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
  }
  function listenerCount$1 (emitter, type) {
    return emitter.listeners(type).length;
  }
  function ReadableState(options, stream) {

    options = options || {};

    // object stream flag. Used to make read(n) ignore n and to
    // make all the buffer merging and length checks go away
    this.objectMode = !!options.objectMode;

    if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

    // the point at which it stops calling _read() to fill the buffer
    // Note: 0 is a valid value, means "don't call _read preemptively ever"
    var hwm = options.highWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

    // cast to ints.
    this.highWaterMark = ~ ~this.highWaterMark;

    // A linked list is used to store data chunks instead of an array because the
    // linked list can remove elements from the beginning faster than
    // array.shift()
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;

    // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true;

    // whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;

    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8';

    // when piping, we only care about 'readable' events that happen
    // after read()ing all the bytes and not getting any pushback.
    this.ranOut = false;

    // the number of writers that are awaiting a drain event in .pipe()s
    this.awaitDrain = 0;

    // if true, a maybeReadMore has been scheduled
    this.readingMore = false;

    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {

    if (!(this instanceof Readable)) return new Readable(options);

    this._readableState = new ReadableState(options, this);

    // legacy
    this.readable = true;

    if (options && typeof options.read === 'function') this._read = options.read;

    EventEmitter.call(this);
  }

  // Manually shove something into the read() buffer.
  // This returns true if the highWaterMark has not been hit yet,
  // similar to how Writable.write() returns true if you should
  // write() some more.
  Readable.prototype.push = function (chunk, encoding) {
    var state = this._readableState;

    if (!state.objectMode && typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
    }

    return readableAddChunk(this, state, chunk, encoding, false);
  };

  // Unshift should *always* be something directly out of read()
  Readable.prototype.unshift = function (chunk) {
    var state = this._readableState;
    return readableAddChunk(this, state, chunk, '', true);
  };

  Readable.prototype.isPaused = function () {
    return this._readableState.flowing === false;
  };

  function readableAddChunk(stream, state, chunk, encoding, addToFront) {
    var er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (chunk === null) {
      state.reading = false;
      onEofChunk(stream, state);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (state.ended && !addToFront) {
        var e = new Error('stream.push() after EOF');
        stream.emit('error', e);
      } else if (state.endEmitted && addToFront) {
        var _e = new Error('stream.unshift() after end event');
        stream.emit('error', _e);
      } else {
        var skipAdd;
        if (state.decoder && !addToFront && !encoding) {
          chunk = state.decoder.write(chunk);
          skipAdd = !state.objectMode && chunk.length === 0;
        }

        if (!addToFront) state.reading = false;

        // Don't add to the buffer if we've decoded to an empty string chunk and
        // we're not in object mode
        if (!skipAdd) {
          // if we want the data now, just emit it.
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
          } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

            if (state.needReadable) emitReadable(stream);
          }
        }

        maybeReadMore(stream, state);
      }
    } else if (!addToFront) {
      state.reading = false;
    }

    return needMoreData(state);
  }

  // if it's past the high water mark, we can push in some more.
  // Also, if we have no data yet, we can stand some
  // more bytes.  This is to work around cases where hwm=0,
  // such as the repl.  Also, if the push() triggered a
  // readable event, and the user called read(largeNumber) such that
  // needReadable was set, then we ought to push more, so that another
  // 'readable' event will be triggered.
  function needMoreData(state) {
    return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
  }

  // backwards compatibility.
  Readable.prototype.setEncoding = function (enc) {
    this._readableState.decoder = new StringDecoder(enc);
    this._readableState.encoding = enc;
    return this;
  };

  // Don't raise the hwm > 8MB
  var MAX_HWM = 0x800000;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      // Get the next highest power of 2 to prevent increasing hwm excessively in
      // tiny amounts
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }

  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended) return 0;
    if (state.objectMode) return 1;
    if (n !== n) {
      // Only flow one buffer at a time
      if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
    }
    // If we're asking for more than the current hwm, then raise the hwm.
    if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length) return n;
    // Don't have enough
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }

  // you can override either this method, or the async _read(n) below.
  Readable.prototype.read = function (n) {
    debug('read', n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;

    if (n !== 0) state.emittedReadable = false;

    // if we're doing read(0) to trigger a readable event, but we
    // already have a bunch of data in the buffer, then just trigger
    // the 'readable' event and move on.
    if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
      debug('read: emitReadable', state.length, state.ended);
      if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
      return null;
    }

    n = howMuchToRead(n, state);

    // if we've ended, and we're now clear, then finish it up.
    if (n === 0 && state.ended) {
      if (state.length === 0) endReadable(this);
      return null;
    }

    // All the actual chunk generation logic needs to be
    // *below* the call to _read.  The reason is that in certain
    // synthetic stream cases, such as passthrough streams, _read
    // may be a completely synchronous operation which may change
    // the state of the read buffer, providing enough data when
    // before there was *not* enough.
    //
    // So, the steps are:
    // 1. Figure out what the state of things will be after we do
    // a read from the buffer.
    //
    // 2. If that resulting state will trigger a _read, then call _read.
    // Note that this may be asynchronous, or synchronous.  Yes, it is
    // deeply ugly to write APIs this way, but that still doesn't mean
    // that the Readable class should behave improperly, as streams are
    // designed to be sync/async agnostic.
    // Take note if the _read call is sync or async (ie, if the read call
    // has returned yet), so that we know whether or not it's safe to emit
    // 'readable' etc.
    //
    // 3. Actually pull the requested chunks out of the buffer and return.

    // if we need a readable event, then we need to do some reading.
    var doRead = state.needReadable;
    debug('need readable', doRead);

    // if we currently have less than the highWaterMark, then also read some
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug('length less than watermark', doRead);
    }

    // however, if we've ended, then there's no point, and if we're already
    // reading, then it's unnecessary.
    if (state.ended || state.reading) {
      doRead = false;
      debug('reading or ended', doRead);
    } else if (doRead) {
      debug('do read');
      state.reading = true;
      state.sync = true;
      // if the length is currently zero, then we *need* a readable event.
      if (state.length === 0) state.needReadable = true;
      // call internal read method
      this._read(state.highWaterMark);
      state.sync = false;
      // If _read pushed data synchronously, then `reading` will be false,
      // and we need to re-evaluate how much data we can return to the user.
      if (!state.reading) n = howMuchToRead(nOrig, state);
    }

    var ret;
    if (n > 0) ret = fromList(n, state);else ret = null;

    if (ret === null) {
      state.needReadable = true;
      n = 0;
    } else {
      state.length -= n;
    }

    if (state.length === 0) {
      // If we have nothing in the buffer, then we want to know
      // as soon as we *do* get something into the buffer.
      if (!state.ended) state.needReadable = true;

      // If we tried to read() past the EOF, then emit end on the next tick.
      if (nOrig !== n && state.ended) endReadable(this);
    }

    if (ret !== null) this.emit('data', ret);

    return ret;
  };

  function chunkInvalid(state, chunk) {
    var er = null;
    if (!isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
      er = new TypeError('Invalid non-string/buffer chunk');
    }
    return er;
  }

  function onEofChunk(stream, state) {
    if (state.ended) return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;

    // emit 'readable' now to make sure it gets picked up.
    emitReadable(stream);
  }

  // Don't emit readable right away in sync mode, because this can trigger
  // another read() call => stack overflow.  This way, it might trigger
  // a nextTick recursion warning, but that's not so bad.
  function emitReadable(stream) {
    var state = stream._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug('emitReadable', state.flowing);
      state.emittedReadable = true;
      if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
    }
  }

  function emitReadable_(stream) {
    debug('emit readable');
    stream.emit('readable');
    flow(stream);
  }

  // at this point, the user has presumably seen the 'readable' event,
  // and called read() to consume some data.  that may have triggered
  // in turn another _read(n) call, in which case reading = true if
  // it's in progress.
  // However, if we're not ended, or reading, and the length < hwm,
  // then go ahead and try to read some more preemptively.
  function maybeReadMore(stream, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      nextTick(maybeReadMore_, stream, state);
    }
  }

  function maybeReadMore_(stream, state) {
    var len = state.length;
    while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
      debug('maybeReadMore read 0');
      stream.read(0);
      if (len === state.length)
        // didn't get any data, stop spinning.
        break;else len = state.length;
    }
    state.readingMore = false;
  }

  // abstract method.  to be overridden in specific implementation classes.
  // call cb(er, data) where data is <= n in length.
  // for virtual (non-string, non-buffer) streams, "length" is somewhat
  // arbitrary, and perhaps not very meaningful.
  Readable.prototype._read = function (n) {
    this.emit('error', new Error('not implemented'));
  };

  Readable.prototype.pipe = function (dest, pipeOpts) {
    var src = this;
    var state = this._readableState;

    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

    var doEnd = (!pipeOpts || pipeOpts.end !== false);

    var endFn = doEnd ? onend : cleanup;
    if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);

    dest.on('unpipe', onunpipe);
    function onunpipe(readable) {
      debug('onunpipe');
      if (readable === src) {
        cleanup();
      }
    }

    function onend() {
      debug('onend');
      dest.end();
    }

    // when the dest drains, it reduces the awaitDrain counter
    // on the source.  This would be more elegant with a .once()
    // handler in flow(), but adding and removing repeatedly is
    // too slow.
    var ondrain = pipeOnDrain(src);
    dest.on('drain', ondrain);

    var cleanedUp = false;
    function cleanup() {
      debug('cleanup');
      // cleanup event handlers once the pipe is broken
      dest.removeListener('close', onclose);
      dest.removeListener('finish', onfinish);
      dest.removeListener('drain', ondrain);
      dest.removeListener('error', onerror);
      dest.removeListener('unpipe', onunpipe);
      src.removeListener('end', onend);
      src.removeListener('end', cleanup);
      src.removeListener('data', ondata);

      cleanedUp = true;

      // if the reader is waiting for a drain event from this
      // specific writer, then it would cause it to never start
      // flowing again.
      // So, if this is awaiting a drain, then we just call it now.
      // If we don't know, then assume that we are waiting for one.
      if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }

    // If the user pushes more data while we're writing to dest then we'll end up
    // in ondata again. However, we only want to increase awaitDrain once because
    // dest will only emit one 'drain' event for the multiple writes.
    // => Introduce a guard on increasing awaitDrain.
    var increasedAwaitDrain = false;
    src.on('data', ondata);
    function ondata(chunk) {
      debug('ondata');
      increasedAwaitDrain = false;
      var ret = dest.write(chunk);
      if (false === ret && !increasedAwaitDrain) {
        // If the user unpiped during `dest.write()`, it is possible
        // to get stuck in a permanently paused state if that write
        // also returned false.
        // => Check whether `dest` is still a piping destination.
        if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
          debug('false write response, pause', src._readableState.awaitDrain);
          src._readableState.awaitDrain++;
          increasedAwaitDrain = true;
        }
        src.pause();
      }
    }

    // if the dest has an error, then stop piping into it.
    // however, don't suppress the throwing behavior for this.
    function onerror(er) {
      debug('onerror', er);
      unpipe();
      dest.removeListener('error', onerror);
      if (listenerCount$1(dest, 'error') === 0) dest.emit('error', er);
    }

    // Make sure our error handler is attached before userland ones.
    prependListener(dest, 'error', onerror);

    // Both close and finish should trigger unpipe, but only once.
    function onclose() {
      dest.removeListener('finish', onfinish);
      unpipe();
    }
    dest.once('close', onclose);
    function onfinish() {
      debug('onfinish');
      dest.removeListener('close', onclose);
      unpipe();
    }
    dest.once('finish', onfinish);

    function unpipe() {
      debug('unpipe');
      src.unpipe(dest);
    }

    // tell the dest that it's being piped to
    dest.emit('pipe', src);

    // start the flow if it hasn't been started already.
    if (!state.flowing) {
      debug('pipe resume');
      src.resume();
    }

    return dest;
  };

  function pipeOnDrain(src) {
    return function () {
      var state = src._readableState;
      debug('pipeOnDrain', state.awaitDrain);
      if (state.awaitDrain) state.awaitDrain--;
      if (state.awaitDrain === 0 && src.listeners('data').length) {
        state.flowing = true;
        flow(src);
      }
    };
  }

  Readable.prototype.unpipe = function (dest) {
    var state = this._readableState;

    // if we're not piping anywhere, then do nothing.
    if (state.pipesCount === 0) return this;

    // just one destination.  most common case.
    if (state.pipesCount === 1) {
      // passed in one, but it's not the right one.
      if (dest && dest !== state.pipes) return this;

      if (!dest) dest = state.pipes;

      // got a match.
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest) dest.emit('unpipe', this);
      return this;
    }

    // slow case. multiple pipe destinations.

    if (!dest) {
      // remove all.
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;

      for (var _i = 0; _i < len; _i++) {
        dests[_i].emit('unpipe', this);
      }return this;
    }

    // try to find the right one.
    var i = indexOf(state.pipes, dest);
    if (i === -1) return this;

    state.pipes.splice(i, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1) state.pipes = state.pipes[0];

    dest.emit('unpipe', this);

    return this;
  };

  // set up data events if they are asked for
  // Ensure readable listeners eventually get something
  Readable.prototype.on = function (ev, fn) {
    var res = EventEmitter.prototype.on.call(this, ev, fn);

    if (ev === 'data') {
      // Start flowing on next tick if stream isn't explicitly paused
      if (this._readableState.flowing !== false) this.resume();
    } else if (ev === 'readable') {
      var state = this._readableState;
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.emittedReadable = false;
        if (!state.reading) {
          nextTick(nReadingNextTick, this);
        } else if (state.length) {
          emitReadable(this);
        }
      }
    }

    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;

  function nReadingNextTick(self) {
    debug('readable nexttick read 0');
    self.read(0);
  }

  // pause() and resume() are remnants of the legacy readable stream API
  // If the user uses them, then switch into old mode.
  Readable.prototype.resume = function () {
    var state = this._readableState;
    if (!state.flowing) {
      debug('resume');
      state.flowing = true;
      resume(this, state);
    }
    return this;
  };

  function resume(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      nextTick(resume_, stream, state);
    }
  }

  function resume_(stream, state) {
    if (!state.reading) {
      debug('resume read 0');
      stream.read(0);
    }

    state.resumeScheduled = false;
    state.awaitDrain = 0;
    stream.emit('resume');
    flow(stream);
    if (state.flowing && !state.reading) stream.read(0);
  }

  Readable.prototype.pause = function () {
    debug('call pause flowing=%j', this._readableState.flowing);
    if (false !== this._readableState.flowing) {
      debug('pause');
      this._readableState.flowing = false;
      this.emit('pause');
    }
    return this;
  };

  function flow(stream) {
    var state = stream._readableState;
    debug('flow', state.flowing);
    while (state.flowing && stream.read() !== null) {}
  }

  // wrap an old-style stream as the async data source.
  // This is *not* part of the readable stream interface.
  // It is an ugly unfortunate mess of history.
  Readable.prototype.wrap = function (stream) {
    var state = this._readableState;
    var paused = false;

    var self = this;
    stream.on('end', function () {
      debug('wrapped end');
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) self.push(chunk);
      }

      self.push(null);
    });

    stream.on('data', function (chunk) {
      debug('wrapped data');
      if (state.decoder) chunk = state.decoder.write(chunk);

      // don't skip over falsy values in objectMode
      if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

      var ret = self.push(chunk);
      if (!ret) {
        paused = true;
        stream.pause();
      }
    });

    // proxy all the other methods.
    // important when wrapping filters and duplexes.
    for (var i in stream) {
      if (this[i] === undefined && typeof stream[i] === 'function') {
        this[i] = function (method) {
          return function () {
            return stream[method].apply(stream, arguments);
          };
        }(i);
      }
    }

    // proxy certain important events.
    var events = ['error', 'close', 'destroy', 'pause', 'resume'];
    forEach$2(events, function (ev) {
      stream.on(ev, self.emit.bind(self, ev));
    });

    // when we try to consume some more bytes, simply unpause the
    // underlying stream.
    self._read = function (n) {
      debug('wrapped _read', n);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };

    return self;
  };

  // exposed for testing purposes only.
  Readable._fromList = fromList;

  // Pluck off n bytes from an array of buffers.
  // Length is the combined lengths of all the buffers in the list.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function fromList(n, state) {
    // nothing buffered
    if (state.length === 0) return null;

    var ret;
    if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
      // read it all, truncate the list
      if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      // read part of list
      ret = fromListPartial(n, state.buffer, state.decoder);
    }

    return ret;
  }

  // Extracts only enough buffered data to satisfy the amount requested.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function fromListPartial(n, list, hasStrings) {
    var ret;
    if (n < list.head.data.length) {
      // slice is the same for buffers and strings
      ret = list.head.data.slice(0, n);
      list.head.data = list.head.data.slice(n);
    } else if (n === list.head.data.length) {
      // first chunk is a perfect match
      ret = list.shift();
    } else {
      // result spans more than one buffer
      ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
    }
    return ret;
  }

  // Copies a specified amount of characters from the list of buffered data
  // chunks.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function copyFromBufferString(n, list) {
    var p = list.head;
    var c = 1;
    var ret = p.data;
    n -= ret.length;
    while (p = p.next) {
      var str = p.data;
      var nb = n > str.length ? str.length : n;
      if (nb === str.length) ret += str;else ret += str.slice(0, n);
      n -= nb;
      if (n === 0) {
        if (nb === str.length) {
          ++c;
          if (p.next) list.head = p.next;else list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = str.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }

  // Copies a specified amount of bytes from the list of buffered data chunks.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function copyFromBuffer(n, list) {
    var ret = Buffer.allocUnsafe(n);
    var p = list.head;
    var c = 1;
    p.data.copy(ret);
    n -= p.data.length;
    while (p = p.next) {
      var buf = p.data;
      var nb = n > buf.length ? buf.length : n;
      buf.copy(ret, ret.length - n, 0, nb);
      n -= nb;
      if (n === 0) {
        if (nb === buf.length) {
          ++c;
          if (p.next) list.head = p.next;else list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = buf.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }

  function endReadable(stream) {
    var state = stream._readableState;

    // If we get here before consuming all the bytes, then that is a
    // bug in node.  Should never happen.
    if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

    if (!state.endEmitted) {
      state.ended = true;
      nextTick(endReadableNT, state, stream);
    }
  }

  function endReadableNT(state, stream) {
    // Check that we didn't get one last unshift.
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream.readable = false;
      stream.emit('end');
    }
  }

  function forEach$2(xs, f) {
    for (var i = 0, l = xs.length; i < l; i++) {
      f(xs[i], i);
    }
  }

  function indexOf(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x) return i;
    }
    return -1;
  }

  // A bit simpler than readable streams.
  Writable.WritableState = WritableState;
  inherits$1(Writable, EventEmitter);

  function nop() {}

  function WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
  }

  function WritableState(options, stream) {
    Object.defineProperty(this, 'buffer', {
      get: deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
    options = options || {};

    // object stream flag to indicate whether or not this stream
    // contains buffers or objects.
    this.objectMode = !!options.objectMode;

    if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

    // the point at which write() starts returning false
    // Note: 0 is a valid value, means that we always return false if
    // the entire buffer is not flushed immediately on write()
    var hwm = options.highWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

    // cast to ints.
    this.highWaterMark = ~ ~this.highWaterMark;

    this.needDrain = false;
    // at the start of calling end()
    this.ending = false;
    // when end() has been called, and returned
    this.ended = false;
    // when 'finish' is emitted
    this.finished = false;

    // should we decode strings into buffers before passing to _write?
    // this is here so that some node-core streams can optimize string
    // handling at a lower level.
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;

    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8';

    // not an actual buffer we keep track of, but a measurement
    // of how much we're waiting to get pushed to some underlying
    // socket or file.
    this.length = 0;

    // a flag to see when we're in the middle of a write.
    this.writing = false;

    // when true all writes will be buffered until .uncork() call
    this.corked = 0;

    // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true;

    // a flag to know if we're processing previously buffered items, which
    // may call the _write() callback in the same tick, so that we don't
    // end up in an overlapped onwrite situation.
    this.bufferProcessing = false;

    // the callback that's passed to _write(chunk,cb)
    this.onwrite = function (er) {
      onwrite(stream, er);
    };

    // the callback that the user supplies to write(chunk,encoding,cb)
    this.writecb = null;

    // the amount that is being written when _write is called.
    this.writelen = 0;

    this.bufferedRequest = null;
    this.lastBufferedRequest = null;

    // number of pending user-supplied write callbacks
    // this must be 0 before 'finish' can be emitted
    this.pendingcb = 0;

    // emit prefinish if the only thing we're waiting for is _write cbs
    // This is relevant for synchronous Transform streams
    this.prefinished = false;

    // True if the error was already emitted and should not be thrown again
    this.errorEmitted = false;

    // count buffered requests
    this.bufferedRequestCount = 0;

    // allocate the first CorkedRequest, there is always
    // one allocated and free to use, and we maintain at most two
    this.corkedRequestsFree = new CorkedRequest(this);
  }

  WritableState.prototype.getBuffer = function writableStateGetBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  function Writable(options) {

    // Writable ctor is applied to Duplexes, though they're not
    // instanceof Writable, they're instanceof Readable.
    if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

    this._writableState = new WritableState(options, this);

    // legacy.
    this.writable = true;

    if (options) {
      if (typeof options.write === 'function') this._write = options.write;

      if (typeof options.writev === 'function') this._writev = options.writev;
    }

    EventEmitter.call(this);
  }

  // Otherwise people can pipe Writable streams, which is just wrong.
  Writable.prototype.pipe = function () {
    this.emit('error', new Error('Cannot pipe, not readable'));
  };

  function writeAfterEnd(stream, cb) {
    var er = new Error('write after end');
    // TODO: defer error events consistently everywhere, not just the cb
    stream.emit('error', er);
    nextTick(cb, er);
  }

  // If we get something that is not a buffer, string, null, or undefined,
  // and we're not in objectMode, then that's an error.
  // Otherwise stream chunks are all considered to be of length=1, and the
  // watermarks determine how many objects to keep in the buffer, rather than
  // how many bytes or characters.
  function validChunk(stream, state, chunk, cb) {
    var valid = true;
    var er = false;
    // Always throw error if a null is written
    // if we are not in object mode then throw
    // if it is not a buffer, string, or undefined.
    if (chunk === null) {
      er = new TypeError('May not write null values to stream');
    } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
      er = new TypeError('Invalid non-string/buffer chunk');
    }
    if (er) {
      stream.emit('error', er);
      nextTick(cb, er);
      valid = false;
    }
    return valid;
  }

  Writable.prototype.write = function (chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;

    if (typeof encoding === 'function') {
      cb = encoding;
      encoding = null;
    }

    if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

    if (typeof cb !== 'function') cb = nop;

    if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, chunk, encoding, cb);
    }

    return ret;
  };

  Writable.prototype.cork = function () {
    var state = this._writableState;

    state.corked++;
  };

  Writable.prototype.uncork = function () {
    var state = this._writableState;

    if (state.corked) {
      state.corked--;

      if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
    }
  };

  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === 'string') encoding = encoding.toLowerCase();
    if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };

  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
      chunk = Buffer.from(chunk, encoding);
    }
    return chunk;
  }

  // if we're already writing something, then just put this
  // in the queue, and wait our turn.  Otherwise, call _write
  // If we return false, then we need a drain event, so set that flag.
  function writeOrBuffer(stream, state, chunk, encoding, cb) {
    chunk = decodeChunk(state, chunk, encoding);

    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
    var len = state.objectMode ? 1 : chunk.length;

    state.length += len;

    var ret = state.length < state.highWaterMark;
    // we must ensure that previous needDrain will not be reset to false.
    if (!ret) state.needDrain = true;

    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream, state, false, len, chunk, encoding, cb);
    }

    return ret;
  }

  function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }

  function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) nextTick(cb, er);else cb(er);

    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  }

  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }

  function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;

    onwriteStateUpdate(state);

    if (er) onwriteError(stream, state, sync, er, cb);else {
      // Check if we're actually ready to finish, but don't emit yet
      var finished = needFinish(state);

      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
        clearBuffer(stream, state);
      }

      if (sync) {
        /*<replacement>*/
          nextTick(afterWrite, stream, state, finished, cb);
        /*</replacement>*/
      } else {
          afterWrite(stream, state, finished, cb);
        }
    }
  }

  function afterWrite(stream, state, finished, cb) {
    if (!finished) onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
  }

  // Must force callback to be called on nextTick, so that we don't
  // emit 'drain' before the write() consumer gets the 'false' return
  // value, and has a chance to attach a 'drain' listener.
  function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream.emit('drain');
    }
  }

  // if there's something in the buffer waiting, then process it
  function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;

    if (stream._writev && entry && entry.next) {
      // Fast case, write everything using _writev()
      var l = state.bufferedRequestCount;
      var buffer = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;

      var count = 0;
      while (entry) {
        buffer[count] = entry;
        entry = entry.next;
        count += 1;
      }

      doWrite(stream, state, true, state.length, buffer, '', holder.finish);

      // doWrite is almost always async, defer these to save a bit of time
      // as the hot path ends with doWrite
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
    } else {
      // Slow case, write chunks one-by-one
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;

        doWrite(stream, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        // if we didn't call the onwrite immediately, then
        // it means that we need to wait until it does.
        // also, that means that the chunk and cb are currently
        // being processed, so move the buffer counter past them.
        if (state.writing) {
          break;
        }
      }

      if (entry === null) state.lastBufferedRequest = null;
    }

    state.bufferedRequestCount = 0;
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }

  Writable.prototype._write = function (chunk, encoding, cb) {
    cb(new Error('not implemented'));
  };

  Writable.prototype._writev = null;

  Writable.prototype.end = function (chunk, encoding, cb) {
    var state = this._writableState;

    if (typeof chunk === 'function') {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === 'function') {
      cb = encoding;
      encoding = null;
    }

    if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

    // .end() fully uncorks
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }

    // ignore unnecessary end() calls.
    if (!state.ending && !state.finished) endWritable(this, state, cb);
  };

  function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
  }

  function prefinish(stream, state) {
    if (!state.prefinished) {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }

  function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
      if (state.pendingcb === 0) {
        prefinish(stream, state);
        state.finished = true;
        stream.emit('finish');
      } else {
        prefinish(stream, state);
      }
    }
    return need;
  }

  function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
      if (state.finished) nextTick(cb);else stream.once('finish', cb);
    }
    state.ended = true;
    stream.writable = false;
  }

  // It seems a linked list but it is not
  // there will be only 2 of these for each stream
  function CorkedRequest(state) {
    var _this = this;

    this.next = null;
    this.entry = null;

    this.finish = function (err) {
      var entry = _this.entry;
      _this.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      if (state.corkedRequestsFree) {
        state.corkedRequestsFree.next = _this;
      } else {
        state.corkedRequestsFree = _this;
      }
    };
  }

  inherits$1(Duplex, Readable);

  var keys = Object.keys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
  function Duplex(options) {
    if (!(this instanceof Duplex)) return new Duplex(options);

    Readable.call(this, options);
    Writable.call(this, options);

    if (options && options.readable === false) this.readable = false;

    if (options && options.writable === false) this.writable = false;

    this.allowHalfOpen = true;
    if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

    this.once('end', onend);
  }

  // the no-half-open enforcer
  function onend() {
    // if we allow half-open state, or if the writable side ended,
    // then we're ok.
    if (this.allowHalfOpen || this._writableState.ended) return;

    // no more data can be written.
    // But allow more writes to happen in this tick.
    nextTick(onEndNT, this);
  }

  function onEndNT(self) {
    self.end();
  }

  // a transform stream is a readable/writable stream where you do
  inherits$1(Transform, Duplex);

  function TransformState(stream) {
    this.afterTransform = function (er, data) {
      return afterTransform(stream, er, data);
    };

    this.needTransform = false;
    this.transforming = false;
    this.writecb = null;
    this.writechunk = null;
    this.writeencoding = null;
  }

  function afterTransform(stream, er, data) {
    var ts = stream._transformState;
    ts.transforming = false;

    var cb = ts.writecb;

    if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

    ts.writechunk = null;
    ts.writecb = null;

    if (data !== null && data !== undefined) stream.push(data);

    cb(er);

    var rs = stream._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      stream._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform)) return new Transform(options);

    Duplex.call(this, options);

    this._transformState = new TransformState(this);

    // when the writable side finishes, then flush out anything remaining.
    var stream = this;

    // start out asking for a readable event once data is transformed.
    this._readableState.needReadable = true;

    // we have implemented the _read method, and done the other things
    // that Readable wants before the first _read call, so unset the
    // sync guard flag.
    this._readableState.sync = false;

    if (options) {
      if (typeof options.transform === 'function') this._transform = options.transform;

      if (typeof options.flush === 'function') this._flush = options.flush;
    }

    this.once('prefinish', function () {
      if (typeof this._flush === 'function') this._flush(function (er) {
        done(stream, er);
      });else done(stream);
    });
  }

  Transform.prototype.push = function (chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };

  // This is the part where you do stuff!
  // override this function in implementation classes.
  // 'chunk' is an input chunk.
  //
  // Call `push(newChunk)` to pass along transformed output
  // to the readable side.  You may call 'push' zero or more times.
  //
  // Call `cb(err)` when you are done with this chunk.  If you pass
  // an error, then that'll put the hurt on the whole operation.  If you
  // never call cb(), then you'll never get another chunk.
  Transform.prototype._transform = function (chunk, encoding, cb) {
    throw new Error('Not implemented');
  };

  Transform.prototype._write = function (chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
    }
  };

  // Doesn't matter what the args are here.
  // _transform does all the work.
  // That we got here means that the readable side wants more data.
  Transform.prototype._read = function (n) {
    var ts = this._transformState;

    if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      // mark that we need a transform, so that any data that comes in
      // will get processed, now that we've asked for it.
      ts.needTransform = true;
    }
  };

  function done(stream, er) {
    if (er) return stream.emit('error', er);

    // if there's nothing in the write buffer, then that means
    // that nothing more will ever be provided
    var ws = stream._writableState;
    var ts = stream._transformState;

    if (ws.length) throw new Error('Calling transform done when ws.length != 0');

    if (ts.transforming) throw new Error('Calling transform done when still transforming');

    return stream.push(null);
  }

  inherits$1(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough)) return new PassThrough(options);

    Transform.call(this, options);
  }

  PassThrough.prototype._transform = function (chunk, encoding, cb) {
    cb(null, chunk);
  };

  inherits$1(Stream, EventEmitter);
  Stream.Readable = Readable;
  Stream.Writable = Writable;
  Stream.Duplex = Duplex;
  Stream.Transform = Transform;
  Stream.PassThrough = PassThrough;

  // Backwards-compat with node 0.4.x
  Stream.Stream = Stream;

  // old-style streams.  Note that the pipe method (the only relevant
  // part of this class) is overridden in the Readable class.

  function Stream() {
    EventEmitter.call(this);
  }

  Stream.prototype.pipe = function(dest, options) {
    var source = this;

    function ondata(chunk) {
      if (dest.writable) {
        if (false === dest.write(chunk) && source.pause) {
          source.pause();
        }
      }
    }

    source.on('data', ondata);

    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }

    dest.on('drain', ondrain);

    // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on('end', onend);
      source.on('close', onclose);
    }

    var didOnEnd = false;
    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;

      dest.end();
    }


    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;

      if (typeof dest.destroy === 'function') dest.destroy();
    }

    // don't leave dangling pipes when there are errors.
    function onerror(er) {
      cleanup();
      if (EventEmitter.listenerCount(this, 'error') === 0) {
        throw er; // Unhandled stream error in pipe.
      }
    }

    source.on('error', onerror);
    dest.on('error', onerror);

    // remove all the event listeners that were added.
    function cleanup() {
      source.removeListener('data', ondata);
      dest.removeListener('drain', ondrain);

      source.removeListener('end', onend);
      source.removeListener('close', onclose);

      source.removeListener('error', onerror);
      dest.removeListener('error', onerror);

      source.removeListener('end', cleanup);
      source.removeListener('close', cleanup);

      dest.removeListener('close', cleanup);
    }

    source.on('end', cleanup);
    source.on('close', cleanup);

    dest.on('close', cleanup);

    dest.emit('pipe', source);

    // Allow for unix-like usage: A.pipe(B).pipe(C)
    return dest;
  };

  var papaparse = createCommonjsModule(function (module, exports) {
  /* @license
  Papa Parse
  v5.3.0
  https://github.com/mholt/PapaParse
  License: MIT
  */

  (function(root, factory)
  {
  	/* globals define */
  	{
  		// Node. Does not work with strict CommonJS, but
  		// only CommonJS-like environments that support module.exports,
  		// like Node.
  		module.exports = factory();
  	}
  	// in strict mode we cannot access arguments.callee, so we need a named reference to
  	// stringify the factory method for the blob worker
  	// eslint-disable-next-line func-name
  }(commonjsGlobal, function moduleFactory()
  {

  	var global = (function() {
  		// alternative method, similar to `Function('return this')()`
  		// but without using `eval` (which is disabled when
  		// using Content Security Policy).

  		if (typeof self !== 'undefined') { return self; }
  		if (typeof window !== 'undefined') { return window; }
  		if (typeof global !== 'undefined') { return global; }

  		// When running tests none of the above have been defined
  		return {};
  	})();


  	function getWorkerBlob() {
  		var URL = global.URL || global.webkitURL || null;
  		var code = moduleFactory.toString();
  		return Papa.BLOB_URL || (Papa.BLOB_URL = URL.createObjectURL(new Blob(['(', code, ')();'], {type: 'text/javascript'})));
  	}

  	var IS_WORKER = !global.document && !!global.postMessage,
  		IS_PAPA_WORKER = IS_WORKER && /blob:/i.test((global.location || {}).protocol);
  	var workers = {}, workerIdCounter = 0;

  	var Papa = {};

  	Papa.parse = CsvToJson;
  	Papa.unparse = JsonToCsv;

  	Papa.RECORD_SEP = String.fromCharCode(30);
  	Papa.UNIT_SEP = String.fromCharCode(31);
  	Papa.BYTE_ORDER_MARK = '\ufeff';
  	Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
  	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
  	Papa.NODE_STREAM_INPUT = 1;

  	// Configurable chunk sizes for local and remote files, respectively
  	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
  	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
  	Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails

  	// Exposed for testing and development only
  	Papa.Parser = Parser;
  	Papa.ParserHandle = ParserHandle;
  	Papa.NetworkStreamer = NetworkStreamer;
  	Papa.FileStreamer = FileStreamer;
  	Papa.StringStreamer = StringStreamer;
  	Papa.ReadableStreamStreamer = ReadableStreamStreamer;
  	if (typeof PAPA_BROWSER_CONTEXT === 'undefined') {
  		Papa.DuplexStreamStreamer = DuplexStreamStreamer;
  	}

  	if (global.jQuery)
  	{
  		var $ = global.jQuery;
  		$.fn.parse = function(options)
  		{
  			var config = options.config || {};
  			var queue = [];

  			this.each(function(idx)
  			{
  				var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
  								&& $(this).attr('type').toLowerCase() === 'file'
  								&& global.FileReader;

  				if (!supported || !this.files || this.files.length === 0)
  					return true;	// continue to next input element

  				for (var i = 0; i < this.files.length; i++)
  				{
  					queue.push({
  						file: this.files[i],
  						inputElem: this,
  						instanceConfig: $.extend({}, config)
  					});
  				}
  			});

  			parseNextFile();	// begin parsing
  			return this;		// maintains chainability


  			function parseNextFile()
  			{
  				if (queue.length === 0)
  				{
  					if (isFunction(options.complete))
  						options.complete();
  					return;
  				}

  				var f = queue[0];

  				if (isFunction(options.before))
  				{
  					var returned = options.before(f.file, f.inputElem);

  					if (typeof returned === 'object')
  					{
  						if (returned.action === 'abort')
  						{
  							error('AbortError', f.file, f.inputElem, returned.reason);
  							return;	// Aborts all queued files immediately
  						}
  						else if (returned.action === 'skip')
  						{
  							fileComplete();	// parse the next file in the queue, if any
  							return;
  						}
  						else if (typeof returned.config === 'object')
  							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
  					}
  					else if (returned === 'skip')
  					{
  						fileComplete();	// parse the next file in the queue, if any
  						return;
  					}
  				}

  				// Wrap up the user's complete callback, if any, so that ours also gets executed
  				var userCompleteFunc = f.instanceConfig.complete;
  				f.instanceConfig.complete = function(results)
  				{
  					if (isFunction(userCompleteFunc))
  						userCompleteFunc(results, f.file, f.inputElem);
  					fileComplete();
  				};

  				Papa.parse(f.file, f.instanceConfig);
  			}

  			function error(name, file, elem, reason)
  			{
  				if (isFunction(options.error))
  					options.error({name: name}, file, elem, reason);
  			}

  			function fileComplete()
  			{
  				queue.splice(0, 1);
  				parseNextFile();
  			}
  		};
  	}


  	if (IS_PAPA_WORKER)
  	{
  		global.onmessage = workerThreadReceivedMessage;
  	}




  	function CsvToJson(_input, _config)
  	{
  		_config = _config || {};
  		var dynamicTyping = _config.dynamicTyping || false;
  		if (isFunction(dynamicTyping)) {
  			_config.dynamicTypingFunction = dynamicTyping;
  			// Will be filled on first row call
  			dynamicTyping = {};
  		}
  		_config.dynamicTyping = dynamicTyping;

  		_config.transform = isFunction(_config.transform) ? _config.transform : false;

  		if (_config.worker && Papa.WORKERS_SUPPORTED)
  		{
  			var w = newWorker();

  			w.userStep = _config.step;
  			w.userChunk = _config.chunk;
  			w.userComplete = _config.complete;
  			w.userError = _config.error;

  			_config.step = isFunction(_config.step);
  			_config.chunk = isFunction(_config.chunk);
  			_config.complete = isFunction(_config.complete);
  			_config.error = isFunction(_config.error);
  			delete _config.worker;	// prevent infinite loop

  			w.postMessage({
  				input: _input,
  				config: _config,
  				workerId: w.id
  			});

  			return;
  		}

  		var streamer = null;
  		if (_input === Papa.NODE_STREAM_INPUT && typeof PAPA_BROWSER_CONTEXT === 'undefined')
  		{
  			// create a node Duplex stream for use
  			// with .pipe
  			streamer = new DuplexStreamStreamer(_config);
  			return streamer.getStream();
  		}
  		else if (typeof _input === 'string')
  		{
  			if (_config.download)
  				streamer = new NetworkStreamer(_config);
  			else
  				streamer = new StringStreamer(_config);
  		}
  		else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
  		{
  			streamer = new ReadableStreamStreamer(_config);
  		}
  		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
  			streamer = new FileStreamer(_config);

  		return streamer.stream(_input);
  	}






  	function JsonToCsv(_input, _config)
  	{
  		// Default configuration

  		/** whether to surround every datum with quotes */
  		var _quotes = false;

  		/** whether to write headers */
  		var _writeHeader = true;

  		/** delimiting character(s) */
  		var _delimiter = ',';

  		/** newline character(s) */
  		var _newline = '\r\n';

  		/** quote character */
  		var _quoteChar = '"';

  		/** escaped quote character, either "" or <config.escapeChar>" */
  		var _escapedQuote = _quoteChar + _quoteChar;

  		/** whether to skip empty lines */
  		var _skipEmptyLines = false;

  		/** the columns (keys) we expect when we unparse objects */
  		var _columns = null;

  		/** whether to prevent outputting cells that can be parsed as formulae by spreadsheet software (Excel and LibreOffice) */
  		var _escapeFormulae = false;

  		unpackConfig();

  		var quoteCharRegex = new RegExp(escapeRegExp(_quoteChar), 'g');

  		if (typeof _input === 'string')
  			_input = JSON.parse(_input);

  		if (Array.isArray(_input))
  		{
  			if (!_input.length || Array.isArray(_input[0]))
  				return serialize(null, _input, _skipEmptyLines);
  			else if (typeof _input[0] === 'object')
  				return serialize(_columns || objectKeys(_input[0]), _input, _skipEmptyLines);
  		}
  		else if (typeof _input === 'object')
  		{
  			if (typeof _input.data === 'string')
  				_input.data = JSON.parse(_input.data);

  			if (Array.isArray(_input.data))
  			{
  				if (!_input.fields)
  					_input.fields =  _input.meta && _input.meta.fields;

  				if (!_input.fields)
  					_input.fields =  Array.isArray(_input.data[0])
  						? _input.fields
  						: objectKeys(_input.data[0]);

  				if (!(Array.isArray(_input.data[0])) && typeof _input.data[0] !== 'object')
  					_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
  			}

  			return serialize(_input.fields || [], _input.data || [], _skipEmptyLines);
  		}

  		// Default (any valid paths should return before this)
  		throw new Error('Unable to serialize unrecognized input');


  		function unpackConfig()
  		{
  			if (typeof _config !== 'object')
  				return;

  			if (typeof _config.delimiter === 'string'
                  && !Papa.BAD_DELIMITERS.filter(function(value) { return _config.delimiter.indexOf(value) !== -1; }).length)
  			{
  				_delimiter = _config.delimiter;
  			}

  			if (typeof _config.quotes === 'boolean'
  				|| typeof _config.quotes === 'function'
  				|| Array.isArray(_config.quotes))
  				_quotes = _config.quotes;

  			if (typeof _config.skipEmptyLines === 'boolean'
  				|| typeof _config.skipEmptyLines === 'string')
  				_skipEmptyLines = _config.skipEmptyLines;

  			if (typeof _config.newline === 'string')
  				_newline = _config.newline;

  			if (typeof _config.quoteChar === 'string')
  				_quoteChar = _config.quoteChar;

  			if (typeof _config.header === 'boolean')
  				_writeHeader = _config.header;

  			if (Array.isArray(_config.columns)) {

  				if (_config.columns.length === 0) throw new Error('Option columns is empty');

  				_columns = _config.columns;
  			}

  			if (_config.escapeChar !== undefined) {
  				_escapedQuote = _config.escapeChar + _quoteChar;
  			}

  			if (typeof _config.escapeFormulae === 'boolean')
  				_escapeFormulae = _config.escapeFormulae;
  		}


  		/** Turns an object's keys into an array */
  		function objectKeys(obj)
  		{
  			if (typeof obj !== 'object')
  				return [];
  			var keys = [];
  			for (var key in obj)
  				keys.push(key);
  			return keys;
  		}

  		/** The double for loop that iterates the data and writes out a CSV string including header row */
  		function serialize(fields, data, skipEmptyLines)
  		{
  			var csv = '';

  			if (typeof fields === 'string')
  				fields = JSON.parse(fields);
  			if (typeof data === 'string')
  				data = JSON.parse(data);

  			var hasHeader = Array.isArray(fields) && fields.length > 0;
  			var dataKeyedByField = !(Array.isArray(data[0]));

  			// If there a header row, write it first
  			if (hasHeader && _writeHeader)
  			{
  				for (var i = 0; i < fields.length; i++)
  				{
  					if (i > 0)
  						csv += _delimiter;
  					csv += safe(fields[i], i);
  				}
  				if (data.length > 0)
  					csv += _newline;
  			}

  			// Then write out the data
  			for (var row = 0; row < data.length; row++)
  			{
  				var maxCol = hasHeader ? fields.length : data[row].length;

  				var emptyLine = false;
  				var nullLine = hasHeader ? Object.keys(data[row]).length === 0 : data[row].length === 0;
  				if (skipEmptyLines && !hasHeader)
  				{
  					emptyLine = skipEmptyLines === 'greedy' ? data[row].join('').trim() === '' : data[row].length === 1 && data[row][0].length === 0;
  				}
  				if (skipEmptyLines === 'greedy' && hasHeader) {
  					var line = [];
  					for (var c = 0; c < maxCol; c++) {
  						var cx = dataKeyedByField ? fields[c] : c;
  						line.push(data[row][cx]);
  					}
  					emptyLine = line.join('').trim() === '';
  				}
  				if (!emptyLine)
  				{
  					for (var col = 0; col < maxCol; col++)
  					{
  						if (col > 0 && !nullLine)
  							csv += _delimiter;
  						var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
  						csv += safe(data[row][colIdx], col);
  					}
  					if (row < data.length - 1 && (!skipEmptyLines || (maxCol > 0 && !nullLine)))
  					{
  						csv += _newline;
  					}
  				}
  			}
  			return csv;
  		}

  		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
  		function safe(str, col)
  		{
  			if (typeof str === 'undefined' || str === null)
  				return '';

  			if (str.constructor === Date)
  				return JSON.stringify(str).slice(1, 25);

  			if (_escapeFormulae === true && typeof str === "string" && (str.match(/^[=+\-@].*$/) !== null)) {
  				str = "'" + str;
  			}

  			var escapedQuoteStr = str.toString().replace(quoteCharRegex, _escapedQuote);

  			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
  							|| (typeof _quotes === 'function' && _quotes(str, col))
  							|| (Array.isArray(_quotes) && _quotes[col])
  							|| hasAny(escapedQuoteStr, Papa.BAD_DELIMITERS)
  							|| escapedQuoteStr.indexOf(_delimiter) > -1
  							|| escapedQuoteStr.charAt(0) === ' '
  							|| escapedQuoteStr.charAt(escapedQuoteStr.length - 1) === ' ';

  			return needsQuotes ? _quoteChar + escapedQuoteStr + _quoteChar : escapedQuoteStr;
  		}

  		function hasAny(str, substrings)
  		{
  			for (var i = 0; i < substrings.length; i++)
  				if (str.indexOf(substrings[i]) > -1)
  					return true;
  			return false;
  		}
  	}

  	/** ChunkStreamer is the base prototype for various streamer implementations. */
  	function ChunkStreamer(config)
  	{
  		this._handle = null;
  		this._finished = false;
  		this._completed = false;
  		this._halted = false;
  		this._input = null;
  		this._baseIndex = 0;
  		this._partialLine = '';
  		this._rowCount = 0;
  		this._start = 0;
  		this._nextChunk = null;
  		this.isFirstChunk = true;
  		this._completeResults = {
  			data: [],
  			errors: [],
  			meta: {}
  		};
  		replaceConfig.call(this, config);

  		this.parseChunk = function(chunk, isFakeChunk)
  		{
  			// First chunk pre-processing
  			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
  			{
  				var modifiedChunk = this._config.beforeFirstChunk(chunk);
  				if (modifiedChunk !== undefined)
  					chunk = modifiedChunk;
  			}
  			this.isFirstChunk = false;
  			this._halted = false;

  			// Rejoin the line we likely just split in two by chunking the file
  			var aggregate = this._partialLine + chunk;
  			this._partialLine = '';

  			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);

  			if (this._handle.paused() || this._handle.aborted()) {
  				this._halted = true;
  				return;
  			}

  			var lastIndex = results.meta.cursor;

  			if (!this._finished)
  			{
  				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
  				this._baseIndex = lastIndex;
  			}

  			if (results && results.data)
  				this._rowCount += results.data.length;

  			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

  			if (IS_PAPA_WORKER)
  			{
  				global.postMessage({
  					results: results,
  					workerId: Papa.WORKER_ID,
  					finished: finishedIncludingPreview
  				});
  			}
  			else if (isFunction(this._config.chunk) && !isFakeChunk)
  			{
  				this._config.chunk(results, this._handle);
  				if (this._handle.paused() || this._handle.aborted()) {
  					this._halted = true;
  					return;
  				}
  				results = undefined;
  				this._completeResults = undefined;
  			}

  			if (!this._config.step && !this._config.chunk) {
  				this._completeResults.data = this._completeResults.data.concat(results.data);
  				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
  				this._completeResults.meta = results.meta;
  			}

  			if (!this._completed && finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted)) {
  				this._config.complete(this._completeResults, this._input);
  				this._completed = true;
  			}

  			if (!finishedIncludingPreview && (!results || !results.meta.paused))
  				this._nextChunk();

  			return results;
  		};

  		this._sendError = function(error)
  		{
  			if (isFunction(this._config.error))
  				this._config.error(error);
  			else if (IS_PAPA_WORKER && this._config.error)
  			{
  				global.postMessage({
  					workerId: Papa.WORKER_ID,
  					error: error,
  					finished: false
  				});
  			}
  		};

  		function replaceConfig(config)
  		{
  			// Deep-copy the config so we can edit it
  			var configCopy = copy(config);
  			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
  			if (!config.step && !config.chunk)
  				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
  			this._handle = new ParserHandle(configCopy);
  			this._handle.streamer = this;
  			this._config = configCopy;	// persist the copy to the caller
  		}
  	}


  	function NetworkStreamer(config)
  	{
  		config = config || {};
  		if (!config.chunkSize)
  			config.chunkSize = Papa.RemoteChunkSize;
  		ChunkStreamer.call(this, config);

  		var xhr;

  		if (IS_WORKER)
  		{
  			this._nextChunk = function()
  			{
  				this._readChunk();
  				this._chunkLoaded();
  			};
  		}
  		else
  		{
  			this._nextChunk = function()
  			{
  				this._readChunk();
  			};
  		}

  		this.stream = function(url)
  		{
  			this._input = url;
  			this._nextChunk();	// Starts streaming
  		};

  		this._readChunk = function()
  		{
  			if (this._finished)
  			{
  				this._chunkLoaded();
  				return;
  			}

  			xhr = new XMLHttpRequest();

  			if (this._config.withCredentials)
  			{
  				xhr.withCredentials = this._config.withCredentials;
  			}

  			if (!IS_WORKER)
  			{
  				xhr.onload = bindFunction(this._chunkLoaded, this);
  				xhr.onerror = bindFunction(this._chunkError, this);
  			}

  			xhr.open(this._config.downloadRequestBody ? 'POST' : 'GET', this._input, !IS_WORKER);
  			// Headers can only be set when once the request state is OPENED
  			if (this._config.downloadRequestHeaders)
  			{
  				var headers = this._config.downloadRequestHeaders;

  				for (var headerName in headers)
  				{
  					xhr.setRequestHeader(headerName, headers[headerName]);
  				}
  			}

  			if (this._config.chunkSize)
  			{
  				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
  				xhr.setRequestHeader('Range', 'bytes=' + this._start + '-' + end);
  			}

  			try {
  				xhr.send(this._config.downloadRequestBody);
  			}
  			catch (err) {
  				this._chunkError(err.message);
  			}

  			if (IS_WORKER && xhr.status === 0)
  				this._chunkError();
  		};

  		this._chunkLoaded = function()
  		{
  			if (xhr.readyState !== 4)
  				return;

  			if (xhr.status < 200 || xhr.status >= 400)
  			{
  				this._chunkError();
  				return;
  			}

  			// Use chunckSize as it may be a diference on reponse lentgh due to characters with more than 1 byte
  			this._start += this._config.chunkSize ? this._config.chunkSize : xhr.responseText.length;
  			this._finished = !this._config.chunkSize || this._start >= getFileSize(xhr);
  			this.parseChunk(xhr.responseText);
  		};

  		this._chunkError = function(errorMessage)
  		{
  			var errorText = xhr.statusText || errorMessage;
  			this._sendError(new Error(errorText));
  		};

  		function getFileSize(xhr)
  		{
  			var contentRange = xhr.getResponseHeader('Content-Range');
  			if (contentRange === null) { // no content range, then finish!
  				return -1;
  			}
  			return parseInt(contentRange.substring(contentRange.lastIndexOf('/') + 1));
  		}
  	}
  	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
  	NetworkStreamer.prototype.constructor = NetworkStreamer;


  	function FileStreamer(config)
  	{
  		config = config || {};
  		if (!config.chunkSize)
  			config.chunkSize = Papa.LocalChunkSize;
  		ChunkStreamer.call(this, config);

  		var reader, slice;

  		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
  		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
  		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

  		this.stream = function(file)
  		{
  			this._input = file;
  			slice = file.slice || file.webkitSlice || file.mozSlice;

  			if (usingAsyncReader)
  			{
  				reader = new FileReader();		// Preferred method of reading files, even in workers
  				reader.onload = bindFunction(this._chunkLoaded, this);
  				reader.onerror = bindFunction(this._chunkError, this);
  			}
  			else
  				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

  			this._nextChunk();	// Starts streaming
  		};

  		this._nextChunk = function()
  		{
  			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
  				this._readChunk();
  		};

  		this._readChunk = function()
  		{
  			var input = this._input;
  			if (this._config.chunkSize)
  			{
  				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
  				input = slice.call(input, this._start, end);
  			}
  			var txt = reader.readAsText(input, this._config.encoding);
  			if (!usingAsyncReader)
  				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
  		};

  		this._chunkLoaded = function(event)
  		{
  			// Very important to increment start each time before handling results
  			this._start += this._config.chunkSize;
  			this._finished = !this._config.chunkSize || this._start >= this._input.size;
  			this.parseChunk(event.target.result);
  		};

  		this._chunkError = function()
  		{
  			this._sendError(reader.error);
  		};

  	}
  	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
  	FileStreamer.prototype.constructor = FileStreamer;


  	function StringStreamer(config)
  	{
  		config = config || {};
  		ChunkStreamer.call(this, config);

  		var remaining;
  		this.stream = function(s)
  		{
  			remaining = s;
  			return this._nextChunk();
  		};
  		this._nextChunk = function()
  		{
  			if (this._finished) return;
  			var size = this._config.chunkSize;
  			var chunk;
  			if(size) {
  				chunk = remaining.substring(0, size);
  				remaining = remaining.substring(size);
  			} else {
  				chunk = remaining;
  				remaining = '';
  			}
  			this._finished = !remaining;
  			return this.parseChunk(chunk);
  		};
  	}
  	StringStreamer.prototype = Object.create(StringStreamer.prototype);
  	StringStreamer.prototype.constructor = StringStreamer;


  	function ReadableStreamStreamer(config)
  	{
  		config = config || {};

  		ChunkStreamer.call(this, config);

  		var queue = [];
  		var parseOnData = true;
  		var streamHasEnded = false;

  		this.pause = function()
  		{
  			ChunkStreamer.prototype.pause.apply(this, arguments);
  			this._input.pause();
  		};

  		this.resume = function()
  		{
  			ChunkStreamer.prototype.resume.apply(this, arguments);
  			this._input.resume();
  		};

  		this.stream = function(stream)
  		{
  			this._input = stream;

  			this._input.on('data', this._streamData);
  			this._input.on('end', this._streamEnd);
  			this._input.on('error', this._streamError);
  		};

  		this._checkIsFinished = function()
  		{
  			if (streamHasEnded && queue.length === 1) {
  				this._finished = true;
  			}
  		};

  		this._nextChunk = function()
  		{
  			this._checkIsFinished();
  			if (queue.length)
  			{
  				this.parseChunk(queue.shift());
  			}
  			else
  			{
  				parseOnData = true;
  			}
  		};

  		this._streamData = bindFunction(function(chunk)
  		{
  			try
  			{
  				queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));

  				if (parseOnData)
  				{
  					parseOnData = false;
  					this._checkIsFinished();
  					this.parseChunk(queue.shift());
  				}
  			}
  			catch (error)
  			{
  				this._streamError(error);
  			}
  		}, this);

  		this._streamError = bindFunction(function(error)
  		{
  			this._streamCleanUp();
  			this._sendError(error);
  		}, this);

  		this._streamEnd = bindFunction(function()
  		{
  			this._streamCleanUp();
  			streamHasEnded = true;
  			this._streamData('');
  		}, this);

  		this._streamCleanUp = bindFunction(function()
  		{
  			this._input.removeListener('data', this._streamData);
  			this._input.removeListener('end', this._streamEnd);
  			this._input.removeListener('error', this._streamError);
  		}, this);
  	}
  	ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
  	ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;


  	function DuplexStreamStreamer(_config) {
  		var Duplex = Stream.Duplex;
  		var config = copy(_config);
  		var parseOnWrite = true;
  		var writeStreamHasFinished = false;
  		var parseCallbackQueue = [];
  		var stream = null;

  		this._onCsvData = function(results)
  		{
  			var data = results.data;
  			if (!stream.push(data) && !this._handle.paused()) {
  				// the writeable consumer buffer has filled up
  				// so we need to pause until more items
  				// can be processed
  				this._handle.pause();
  			}
  		};

  		this._onCsvComplete = function()
  		{
  			// node will finish the read stream when
  			// null is pushed
  			stream.push(null);
  		};

  		config.step = bindFunction(this._onCsvData, this);
  		config.complete = bindFunction(this._onCsvComplete, this);
  		ChunkStreamer.call(this, config);

  		this._nextChunk = function()
  		{
  			if (writeStreamHasFinished && parseCallbackQueue.length === 1) {
  				this._finished = true;
  			}
  			if (parseCallbackQueue.length) {
  				parseCallbackQueue.shift()();
  			} else {
  				parseOnWrite = true;
  			}
  		};

  		this._addToParseQueue = function(chunk, callback)
  		{
  			// add to queue so that we can indicate
  			// completion via callback
  			// node will automatically pause the incoming stream
  			// when too many items have been added without their
  			// callback being invoked
  			parseCallbackQueue.push(bindFunction(function() {
  				this.parseChunk(typeof chunk === 'string' ? chunk : chunk.toString(config.encoding));
  				if (isFunction(callback)) {
  					return callback();
  				}
  			}, this));
  			if (parseOnWrite) {
  				parseOnWrite = false;
  				this._nextChunk();
  			}
  		};

  		this._onRead = function()
  		{
  			if (this._handle.paused()) {
  				// the writeable consumer can handle more data
  				// so resume the chunk parsing
  				this._handle.resume();
  			}
  		};

  		this._onWrite = function(chunk, encoding, callback)
  		{
  			this._addToParseQueue(chunk, callback);
  		};

  		this._onWriteComplete = function()
  		{
  			writeStreamHasFinished = true;
  			// have to write empty string
  			// so parser knows its done
  			this._addToParseQueue('');
  		};

  		this.getStream = function()
  		{
  			return stream;
  		};
  		stream = new Duplex({
  			readableObjectMode: true,
  			decodeStrings: false,
  			read: bindFunction(this._onRead, this),
  			write: bindFunction(this._onWrite, this)
  		});
  		stream.once('finish', bindFunction(this._onWriteComplete, this));
  	}
  	if (typeof PAPA_BROWSER_CONTEXT === 'undefined') {
  		DuplexStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
  		DuplexStreamStreamer.prototype.constructor = DuplexStreamStreamer;
  	}


  	// Use one ParserHandle per entire CSV file or string
  	function ParserHandle(_config)
  	{
  		// One goal is to minimize the use of regular expressions...
  		var MAX_FLOAT = Math.pow(2, 53);
  		var MIN_FLOAT = -MAX_FLOAT;
  		var FLOAT = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)(e[-+]?\d+)?\s*$/;
  		var ISO_DATE = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
  		var self = this;
  		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
  		var _rowCounter = 0;	// Number of rows that have been parsed so far
  		var _input;				// The input being parsed
  		var _parser;			// The core parser being used
  		var _paused = false;	// Whether we are paused or not
  		var _aborted = false;	// Whether the parser has aborted or not
  		var _delimiterError;	// Temporary state between delimiter detection and processing results
  		var _fields = [];		// Fields are from the header row of the input, if there is one
  		var _results = {		// The last results returned from the parser
  			data: [],
  			errors: [],
  			meta: {}
  		};

  		if (isFunction(_config.step))
  		{
  			var userStep = _config.step;
  			_config.step = function(results)
  			{
  				_results = results;

  				if (needsHeaderRow())
  					processResults();
  				else	// only call user's step function after header row
  				{
  					processResults();

  					// It's possbile that this line was empty and there's no row here after all
  					if (_results.data.length === 0)
  						return;

  					_stepCounter += results.data.length;
  					if (_config.preview && _stepCounter > _config.preview)
  						_parser.abort();
  					else {
  						_results.data = _results.data[0];
  						userStep(_results, self);
  					}
  				}
  			};
  		}

  		/**
  		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
  		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
  		 * when an input comes in multiple chunks, like from a file.
  		 */
  		this.parse = function(input, baseIndex, ignoreLastRow)
  		{
  			var quoteChar = _config.quoteChar || '"';
  			if (!_config.newline)
  				_config.newline = guessLineEndings(input, quoteChar);

  			_delimiterError = false;
  			if (!_config.delimiter)
  			{
  				var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines, _config.comments, _config.delimitersToGuess);
  				if (delimGuess.successful)
  					_config.delimiter = delimGuess.bestDelimiter;
  				else
  				{
  					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
  					_config.delimiter = Papa.DefaultDelimiter;
  				}
  				_results.meta.delimiter = _config.delimiter;
  			}
  			else if(isFunction(_config.delimiter))
  			{
  				_config.delimiter = _config.delimiter(input);
  				_results.meta.delimiter = _config.delimiter;
  			}

  			var parserConfig = copy(_config);
  			if (_config.preview && _config.header)
  				parserConfig.preview++;	// to compensate for header row

  			_input = input;
  			_parser = new Parser(parserConfig);
  			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
  			processResults();
  			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
  		};

  		this.paused = function()
  		{
  			return _paused;
  		};

  		this.pause = function()
  		{
  			_paused = true;
  			_parser.abort();

  			// If it is streaming via "chunking", the reader will start appending correctly already so no need to substring,
  			// otherwise we can get duplicate content within a row
  			_input = isFunction(_config.chunk) ? "" : _input.substring(_parser.getCharIndex());
  		};

  		this.resume = function()
  		{
  			if(self.streamer._halted) {
  				_paused = false;
  				self.streamer.parseChunk(_input, true);
  			} else {
  				// Bugfix: #636 In case the processing hasn't halted yet
  				// wait for it to halt in order to resume
  				setTimeout(self.resume, 3);
  			}
  		};

  		this.aborted = function()
  		{
  			return _aborted;
  		};

  		this.abort = function()
  		{
  			_aborted = true;
  			_parser.abort();
  			_results.meta.aborted = true;
  			if (isFunction(_config.complete))
  				_config.complete(_results);
  			_input = '';
  		};

  		function testEmptyLine(s) {
  			return _config.skipEmptyLines === 'greedy' ? s.join('').trim() === '' : s.length === 1 && s[0].length === 0;
  		}

  		function testFloat(s) {
  			if (FLOAT.test(s)) {
  				var floatValue = parseFloat(s);
  				if (floatValue > MIN_FLOAT && floatValue < MAX_FLOAT) {
  					return true;
  				}
  			}
  			return false;
  		}

  		function processResults()
  		{
  			if (_results && _delimiterError)
  			{
  				addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \'' + Papa.DefaultDelimiter + '\'');
  				_delimiterError = false;
  			}

  			if (_config.skipEmptyLines)
  			{
  				for (var i = 0; i < _results.data.length; i++)
  					if (testEmptyLine(_results.data[i]))
  						_results.data.splice(i--, 1);
  			}

  			if (needsHeaderRow())
  				fillHeaderFields();

  			return applyHeaderAndDynamicTypingAndTransformation();
  		}

  		function needsHeaderRow()
  		{
  			return _config.header && _fields.length === 0;
  		}

  		function fillHeaderFields()
  		{
  			if (!_results)
  				return;

  			function addHeader(header, i)
  			{
  				if (isFunction(_config.transformHeader))
  					header = _config.transformHeader(header, i);

  				_fields.push(header);
  			}

  			if (Array.isArray(_results.data[0]))
  			{
  				for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
  					_results.data[i].forEach(addHeader);

  				_results.data.splice(0, 1);
  			}
  			// if _results.data[0] is not an array, we are in a step where _results.data is the row.
  			else
  				_results.data.forEach(addHeader);
  		}

  		function shouldApplyDynamicTyping(field) {
  			// Cache function values to avoid calling it for each row
  			if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
  				_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
  			}
  			return (_config.dynamicTyping[field] || _config.dynamicTyping) === true;
  		}

  		function parseDynamic(field, value)
  		{
  			if (shouldApplyDynamicTyping(field))
  			{
  				if (value === 'true' || value === 'TRUE')
  					return true;
  				else if (value === 'false' || value === 'FALSE')
  					return false;
  				else if (testFloat(value))
  					return parseFloat(value);
  				else if (ISO_DATE.test(value))
  					return new Date(value);
  				else
  					return (value === '' ? null : value);
  			}
  			return value;
  		}

  		function applyHeaderAndDynamicTypingAndTransformation()
  		{
  			if (!_results || (!_config.header && !_config.dynamicTyping && !_config.transform))
  				return _results;

  			function processRow(rowSource, i)
  			{
  				var row = _config.header ? {} : [];

  				var j;
  				for (j = 0; j < rowSource.length; j++)
  				{
  					var field = j;
  					var value = rowSource[j];

  					if (_config.header)
  						field = j >= _fields.length ? '__parsed_extra' : _fields[j];

  					if (_config.transform)
  						value = _config.transform(value,field);

  					value = parseDynamic(field, value);

  					if (field === '__parsed_extra')
  					{
  						row[field] = row[field] || [];
  						row[field].push(value);
  					}
  					else
  						row[field] = value;
  				}


  				if (_config.header)
  				{
  					if (j > _fields.length)
  						addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, _rowCounter + i);
  					else if (j < _fields.length)
  						addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, _rowCounter + i);
  				}

  				return row;
  			}

  			var incrementBy = 1;
  			if (!_results.data.length || Array.isArray(_results.data[0]))
  			{
  				_results.data = _results.data.map(processRow);
  				incrementBy = _results.data.length;
  			}
  			else
  				_results.data = processRow(_results.data, 0);


  			if (_config.header && _results.meta)
  				_results.meta.fields = _fields;

  			_rowCounter += incrementBy;
  			return _results;
  		}

  		function guessDelimiter(input, newline, skipEmptyLines, comments, delimitersToGuess) {
  			var bestDelim, bestDelta, fieldCountPrevRow, maxFieldCount;

  			delimitersToGuess = delimitersToGuess || [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];

  			for (var i = 0; i < delimitersToGuess.length; i++) {
  				var delim = delimitersToGuess[i];
  				var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
  				fieldCountPrevRow = undefined;

  				var preview = new Parser({
  					comments: comments,
  					delimiter: delim,
  					newline: newline,
  					preview: 10
  				}).parse(input);

  				for (var j = 0; j < preview.data.length; j++) {
  					if (skipEmptyLines && testEmptyLine(preview.data[j])) {
  						emptyLinesCount++;
  						continue;
  					}
  					var fieldCount = preview.data[j].length;
  					avgFieldCount += fieldCount;

  					if (typeof fieldCountPrevRow === 'undefined') {
  						fieldCountPrevRow = fieldCount;
  						continue;
  					}
  					else if (fieldCount > 0) {
  						delta += Math.abs(fieldCount - fieldCountPrevRow);
  						fieldCountPrevRow = fieldCount;
  					}
  				}

  				if (preview.data.length > 0)
  					avgFieldCount /= (preview.data.length - emptyLinesCount);

  				if ((typeof bestDelta === 'undefined' || delta <= bestDelta)
  					&& (typeof maxFieldCount === 'undefined' || avgFieldCount > maxFieldCount) && avgFieldCount > 1.99) {
  					bestDelta = delta;
  					bestDelim = delim;
  					maxFieldCount = avgFieldCount;
  				}
  			}

  			_config.delimiter = bestDelim;

  			return {
  				successful: !!bestDelim,
  				bestDelimiter: bestDelim
  			};
  		}

  		function guessLineEndings(input, quoteChar)
  		{
  			input = input.substring(0, 1024 * 1024);	// max length 1 MB
  			// Replace all the text inside quotes
  			var re = new RegExp(escapeRegExp(quoteChar) + '([^]*?)' + escapeRegExp(quoteChar), 'gm');
  			input = input.replace(re, '');

  			var r = input.split('\r');

  			var n = input.split('\n');

  			var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);

  			if (r.length === 1 || nAppearsFirst)
  				return '\n';

  			var numWithN = 0;
  			for (var i = 0; i < r.length; i++)
  			{
  				if (r[i][0] === '\n')
  					numWithN++;
  			}

  			return numWithN >= r.length / 2 ? '\r\n' : '\r';
  		}

  		function addError(type, code, msg, row)
  		{
  			var error = {
  				type: type,
  				code: code,
  				message: msg
  			};
  			if(row !== undefined) {
  				error.row = row;
  			}
  			_results.errors.push(error);
  		}
  	}

  	/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
  	function escapeRegExp(string)
  	{
  		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  	}

  	/** The core parser implements speedy and correct CSV parsing */
  	function Parser(config)
  	{
  		// Unpack the config object
  		config = config || {};
  		var delim = config.delimiter;
  		var newline = config.newline;
  		var comments = config.comments;
  		var step = config.step;
  		var preview = config.preview;
  		var fastMode = config.fastMode;
  		var quoteChar;
  		/** Allows for no quoteChar by setting quoteChar to undefined in config */
  		if (config.quoteChar === undefined) {
  			quoteChar = '"';
  		} else {
  			quoteChar = config.quoteChar;
  		}
  		var escapeChar = quoteChar;
  		if (config.escapeChar !== undefined) {
  			escapeChar = config.escapeChar;
  		}

  		// Delimiter must be valid
  		if (typeof delim !== 'string'
  			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
  			delim = ',';

  		// Comment character must be valid
  		if (comments === delim)
  			throw new Error('Comment character same as delimiter');
  		else if (comments === true)
  			comments = '#';
  		else if (typeof comments !== 'string'
  			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
  			comments = false;

  		// Newline must be valid: \r, \n, or \r\n
  		if (newline !== '\n' && newline !== '\r' && newline !== '\r\n')
  			newline = '\n';

  		// We're gonna need these at the Parser scope
  		var cursor = 0;
  		var aborted = false;

  		this.parse = function(input, baseIndex, ignoreLastRow)
  		{
  			// For some reason, in Chrome, this speeds things up (!?)
  			if (typeof input !== 'string')
  				throw new Error('Input must be a string');

  			// We don't need to compute some of these every time parse() is called,
  			// but having them in a more local scope seems to perform better
  			var inputLen = input.length,
  				delimLen = delim.length,
  				newlineLen = newline.length,
  				commentsLen = comments.length;
  			var stepIsFunction = isFunction(step);

  			// Establish starting state
  			cursor = 0;
  			var data = [], errors = [], row = [], lastCursor = 0;

  			if (!input)
  				return returnable();

  			if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
  			{
  				var rows = input.split(newline);
  				for (var i = 0; i < rows.length; i++)
  				{
  					row = rows[i];
  					cursor += row.length;
  					if (i !== rows.length - 1)
  						cursor += newline.length;
  					else if (ignoreLastRow)
  						return returnable();
  					if (comments && row.substring(0, commentsLen) === comments)
  						continue;
  					if (stepIsFunction)
  					{
  						data = [];
  						pushRow(row.split(delim));
  						doStep();
  						if (aborted)
  							return returnable();
  					}
  					else
  						pushRow(row.split(delim));
  					if (preview && i >= preview)
  					{
  						data = data.slice(0, preview);
  						return returnable(true);
  					}
  				}
  				return returnable();
  			}

  			var nextDelim = input.indexOf(delim, cursor);
  			var nextNewline = input.indexOf(newline, cursor);
  			var quoteCharRegex = new RegExp(escapeRegExp(escapeChar) + escapeRegExp(quoteChar), 'g');
  			var quoteSearch = input.indexOf(quoteChar, cursor);

  			// Parser loop
  			for (;;)
  			{
  				// Field has opening quote
  				if (input[cursor] === quoteChar)
  				{
  					// Start our search for the closing quote where the cursor is
  					quoteSearch = cursor;

  					// Skip the opening quote
  					cursor++;

  					for (;;)
  					{
  						// Find closing quote
  						quoteSearch = input.indexOf(quoteChar, quoteSearch + 1);

  						//No other quotes are found - no other delimiters
  						if (quoteSearch === -1)
  						{
  							if (!ignoreLastRow) {
  								// No closing quote... what a pity
  								errors.push({
  									type: 'Quotes',
  									code: 'MissingQuotes',
  									message: 'Quoted field unterminated',
  									row: data.length,	// row has yet to be inserted
  									index: cursor
  								});
  							}
  							return finish();
  						}

  						// Closing quote at EOF
  						if (quoteSearch === inputLen - 1)
  						{
  							var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
  							return finish(value);
  						}

  						// If this quote is escaped, it's part of the data; skip it
  						// If the quote character is the escape character, then check if the next character is the escape character
  						if (quoteChar === escapeChar &&  input[quoteSearch + 1] === escapeChar)
  						{
  							quoteSearch++;
  							continue;
  						}

  						// If the quote character is not the escape character, then check if the previous character was the escape character
  						if (quoteChar !== escapeChar && quoteSearch !== 0 && input[quoteSearch - 1] === escapeChar)
  						{
  							continue;
  						}

  						if(nextDelim !== -1 && nextDelim < (quoteSearch + 1)) {
  							nextDelim = input.indexOf(delim, (quoteSearch + 1));
  						}
  						if(nextNewline !== -1 && nextNewline < (quoteSearch + 1)) {
  							nextNewline = input.indexOf(newline, (quoteSearch + 1));
  						}
  						// Check up to nextDelim or nextNewline, whichever is closest
  						var checkUpTo = nextNewline === -1 ? nextDelim : Math.min(nextDelim, nextNewline);
  						var spacesBetweenQuoteAndDelimiter = extraSpaces(checkUpTo);

  						// Closing quote followed by delimiter or 'unnecessary spaces + delimiter'
  						if (input[quoteSearch + 1 + spacesBetweenQuoteAndDelimiter] === delim)
  						{
  							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
  							cursor = quoteSearch + 1 + spacesBetweenQuoteAndDelimiter + delimLen;

  							// If char after following delimiter is not quoteChar, we find next quote char position
  							if (input[quoteSearch + 1 + spacesBetweenQuoteAndDelimiter + delimLen] !== quoteChar)
  							{
  								quoteSearch = input.indexOf(quoteChar, cursor);
  							}
  							nextDelim = input.indexOf(delim, cursor);
  							nextNewline = input.indexOf(newline, cursor);
  							break;
  						}

  						var spacesBetweenQuoteAndNewLine = extraSpaces(nextNewline);

  						// Closing quote followed by newline or 'unnecessary spaces + newLine'
  						if (input.substring(quoteSearch + 1 + spacesBetweenQuoteAndNewLine, quoteSearch + 1 + spacesBetweenQuoteAndNewLine + newlineLen) === newline)
  						{
  							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
  							saveRow(quoteSearch + 1 + spacesBetweenQuoteAndNewLine + newlineLen);
  							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field
  							quoteSearch = input.indexOf(quoteChar, cursor);	// we search for first quote in next line

  							if (stepIsFunction)
  							{
  								doStep();
  								if (aborted)
  									return returnable();
  							}

  							if (preview && data.length >= preview)
  								return returnable(true);

  							break;
  						}


  						// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
  						errors.push({
  							type: 'Quotes',
  							code: 'InvalidQuotes',
  							message: 'Trailing quote on quoted field is malformed',
  							row: data.length,	// row has yet to be inserted
  							index: cursor
  						});

  						quoteSearch++;
  						continue;

  					}

  					continue;
  				}

  				// Comment found at start of new line
  				if (comments && row.length === 0 && input.substring(cursor, cursor + commentsLen) === comments)
  				{
  					if (nextNewline === -1)	// Comment ends at EOF
  						return returnable();
  					cursor = nextNewline + newlineLen;
  					nextNewline = input.indexOf(newline, cursor);
  					nextDelim = input.indexOf(delim, cursor);
  					continue;
  				}

  				// Next delimiter comes before next newline, so we've reached end of field
  				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
  				{
  					// we check, if we have quotes, because delimiter char may be part of field enclosed in quotes
  					if (quoteSearch > nextDelim) {
  						// we have quotes, so we try to find the next delimiter not enclosed in quotes and also next starting quote char
  						var nextDelimObj = getNextUnquotedDelimiter(nextDelim, quoteSearch, nextNewline);

  						// if we have next delimiter char which is not enclosed in quotes
  						if (nextDelimObj && typeof nextDelimObj.nextDelim !== 'undefined') {
  							nextDelim = nextDelimObj.nextDelim;
  							quoteSearch = nextDelimObj.quoteSearch;
  							row.push(input.substring(cursor, nextDelim));
  							cursor = nextDelim + delimLen;
  							// we look for next delimiter char
  							nextDelim = input.indexOf(delim, cursor);
  							continue;
  						}
  					} else {
  						row.push(input.substring(cursor, nextDelim));
  						cursor = nextDelim + delimLen;
  						nextDelim = input.indexOf(delim, cursor);
  						continue;
  					}
  				}

  				// End of row
  				if (nextNewline !== -1)
  				{
  					row.push(input.substring(cursor, nextNewline));
  					saveRow(nextNewline + newlineLen);

  					if (stepIsFunction)
  					{
  						doStep();
  						if (aborted)
  							return returnable();
  					}

  					if (preview && data.length >= preview)
  						return returnable(true);

  					continue;
  				}

  				break;
  			}


  			return finish();


  			function pushRow(row)
  			{
  				data.push(row);
  				lastCursor = cursor;
  			}

  			/**
               * checks if there are extra spaces after closing quote and given index without any text
               * if Yes, returns the number of spaces
               */
  			function extraSpaces(index) {
  				var spaceLength = 0;
  				if (index !== -1) {
  					var textBetweenClosingQuoteAndIndex = input.substring(quoteSearch + 1, index);
  					if (textBetweenClosingQuoteAndIndex && textBetweenClosingQuoteAndIndex.trim() === '') {
  						spaceLength = textBetweenClosingQuoteAndIndex.length;
  					}
  				}
  				return spaceLength;
  			}

  			/**
  			 * Appends the remaining input from cursor to the end into
  			 * row, saves the row, calls step, and returns the results.
  			 */
  			function finish(value)
  			{
  				if (ignoreLastRow)
  					return returnable();
  				if (typeof value === 'undefined')
  					value = input.substring(cursor);
  				row.push(value);
  				cursor = inputLen;	// important in case parsing is paused
  				pushRow(row);
  				if (stepIsFunction)
  					doStep();
  				return returnable();
  			}

  			/**
  			 * Appends the current row to the results. It sets the cursor
  			 * to newCursor and finds the nextNewline. The caller should
  			 * take care to execute user's step function and check for
  			 * preview and end parsing if necessary.
  			 */
  			function saveRow(newCursor)
  			{
  				cursor = newCursor;
  				pushRow(row);
  				row = [];
  				nextNewline = input.indexOf(newline, cursor);
  			}

  			/** Returns an object with the results, errors, and meta. */
  			function returnable(stopped)
  			{
  				return {
  					data: data,
  					errors: errors,
  					meta: {
  						delimiter: delim,
  						linebreak: newline,
  						aborted: aborted,
  						truncated: !!stopped,
  						cursor: lastCursor + (baseIndex || 0)
  					}
  				};
  			}

  			/** Executes the user's step function and resets data & errors. */
  			function doStep()
  			{
  				step(returnable());
  				data = [];
  				errors = [];
  			}

  			/** Gets the delimiter character, which is not inside the quoted field */
  			function getNextUnquotedDelimiter(nextDelim, quoteSearch, newLine) {
  				var result = {
  					nextDelim: undefined,
  					quoteSearch: undefined
  				};
  				// get the next closing quote character
  				var nextQuoteSearch = input.indexOf(quoteChar, quoteSearch + 1);

  				// if next delimiter is part of a field enclosed in quotes
  				if (nextDelim > quoteSearch && nextDelim < nextQuoteSearch && (nextQuoteSearch < newLine || newLine === -1)) {
  					// get the next delimiter character after this one
  					var nextNextDelim = input.indexOf(delim, nextQuoteSearch);

  					// if there is no next delimiter, return default result
  					if (nextNextDelim === -1) {
  						return result;
  					}
  					// find the next opening quote char position
  					if (nextNextDelim > nextQuoteSearch) {
  						nextQuoteSearch = input.indexOf(quoteChar, nextQuoteSearch + 1);
  					}
  					// try to get the next delimiter position
  					result = getNextUnquotedDelimiter(nextNextDelim, nextQuoteSearch, newLine);
  				} else {
  					result = {
  						nextDelim: nextDelim,
  						quoteSearch: quoteSearch
  					};
  				}

  				return result;
  			}
  		};

  		/** Sets the abort flag */
  		this.abort = function()
  		{
  			aborted = true;
  		};

  		/** Gets the cursor position */
  		this.getCharIndex = function()
  		{
  			return cursor;
  		};
  	}


  	function newWorker()
  	{
  		if (!Papa.WORKERS_SUPPORTED)
  			return false;

  		var workerUrl = getWorkerBlob();
  		var w = new global.Worker(workerUrl);
  		w.onmessage = mainThreadReceivedMessage;
  		w.id = workerIdCounter++;
  		workers[w.id] = w;
  		return w;
  	}

  	/** Callback when main thread receives a message */
  	function mainThreadReceivedMessage(e)
  	{
  		var msg = e.data;
  		var worker = workers[msg.workerId];
  		var aborted = false;

  		if (msg.error)
  			worker.userError(msg.error, msg.file);
  		else if (msg.results && msg.results.data)
  		{
  			var abort = function() {
  				aborted = true;
  				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
  			};

  			var handle = {
  				abort: abort,
  				pause: notImplemented,
  				resume: notImplemented
  			};

  			if (isFunction(worker.userStep))
  			{
  				for (var i = 0; i < msg.results.data.length; i++)
  				{
  					worker.userStep({
  						data: msg.results.data[i],
  						errors: msg.results.errors,
  						meta: msg.results.meta
  					}, handle);
  					if (aborted)
  						break;
  				}
  				delete msg.results;	// free memory ASAP
  			}
  			else if (isFunction(worker.userChunk))
  			{
  				worker.userChunk(msg.results, handle, msg.file);
  				delete msg.results;
  			}
  		}

  		if (msg.finished && !aborted)
  			completeWorker(msg.workerId, msg.results);
  	}

  	function completeWorker(workerId, results) {
  		var worker = workers[workerId];
  		if (isFunction(worker.userComplete))
  			worker.userComplete(results);
  		worker.terminate();
  		delete workers[workerId];
  	}

  	function notImplemented() {
  		throw new Error('Not implemented.');
  	}

  	/** Callback when worker thread receives a message */
  	function workerThreadReceivedMessage(e)
  	{
  		var msg = e.data;

  		if (typeof Papa.WORKER_ID === 'undefined' && msg)
  			Papa.WORKER_ID = msg.workerId;

  		if (typeof msg.input === 'string')
  		{
  			global.postMessage({
  				workerId: Papa.WORKER_ID,
  				results: Papa.parse(msg.input, msg.config),
  				finished: true
  			});
  		}
  		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
  		{
  			var results = Papa.parse(msg.input, msg.config);
  			if (results)
  				global.postMessage({
  					workerId: Papa.WORKER_ID,
  					results: results,
  					finished: true
  				});
  		}
  	}

  	/** Makes a deep copy of an array or object (mostly) */
  	function copy(obj)
  	{
  		if (typeof obj !== 'object' || obj === null)
  			return obj;
  		var cpy = Array.isArray(obj) ? [] : {};
  		for (var key in obj)
  			cpy[key] = copy(obj[key]);
  		return cpy;
  	}

  	function bindFunction(f, self)
  	{
  		return function() { f.apply(self, arguments); };
  	}

  	function isFunction(func)
  	{
  		return typeof func === 'function';
  	}

  	return Papa;
  }));
  });

  let Data = (function () {

      // NEW DIM
      let data, labels, stats;

      function init() {
          let elem = document.createElement("INPUT");
          elem.setAttribute("type", "file");
          elem.setAttribute("id", "localfile");
          elem.style.display = "none";
          elem.addEventListener('change', readSingleFile, false);
          document.body.appendChild(elem);
      }

      function readFileFromClient() {
          let elem = document.getElementById("localfile");
          elem.click();
      }

      function readSingleFile(evt) {
          let f = evt.target.files[0];
          if (f) {
              //console.log("Reading File " + f.name);
              let r = new FileReader();
              r.onload = function (e) {
                  parse(e.target.result);
              };
              r.readAsText(f);
          } else {
              alert("Could not read file.");
          }
      }

      function parse(textCSV) {
          //console.log(textCSV);
          let results = papaparse.parse(textCSV, {delimiter:',', dynamicTyping: true, skipEmptyLines: true});
          //console.log(results.data);
          //console.log(results);

          // NEW DIM out
          //let textJSON =  JSON.stringify(results.data);
          //console.log(textJSON);
          //let dataFromJSON = JSON.parse(textJSON);

          // NEW DIM stats as function parameter out
          // Set module variable.
          data = results.data;
          splitDataAndLabels();
          preprocessLabels();
          calcStats();
          App.dataLoadedCallback(data, labels, stats);
      }

      function readFileFromServer(filename) {
          let request = new XMLHttpRequest();
          if (!request) {
              console.log('Error: No XMLHttpRequest instance.');
              return false;
          }

          request.onreadystatechange = function() {
              if (request.readyState === XMLHttpRequest.DONE) {
                  if (request.status === 200) {
                      parse(request.responseText);
                  } else {
                      console.log('There was a problem with the request.');
                  }
              }
          };

          request.open('GET', filename);
          request.send();
      }

      /*
           Get the minimum and maximum values for the first n (max 3) data columns.
           @return: object with field array of objects {min, max, range, mean} for each field
           and separate arrays with {min, max, range, mean} with field as index
           and value for maxRange
      */
      function calcStats() {
          if (!data ||data.length === 0) {
              console.log("Data no valid.");
              return undefined;
          }
          // NEW DIM.
          stats = {};
          // Assumes constant number of fields in data.
          let nbFields = data[0].length;
          stats.field= Array(nbFields).fill(0);
          stats.min= Array(nbFields).fill(0);
          stats.max= Array(nbFields).fill(0);
          stats.range= Array(nbFields).fill(0);
          stats.mean= Array(nbFields).fill(0);

          let min, max, mean, i;

          for (i = 0; i < nbFields; i++) {
              min = max = undefined;
              mean = 0;
              for (let d = 0; d < data.length; d++) {
                  mean += data[d][i];
                  if (max === undefined || (data[d][i] > max)) {
                      max = data[d][i];
                  }
                  if (min === undefined || (data[d][i] < min)) {
                      min = data[d][i];
                  }
              }
              mean /= data.length;
              stats.field[i] = {min: min, max: max, range: max - min, mean: mean};
              stats.min[i] = min;
              stats.max[i] = max;
              stats.range[i] = max - min;
              stats.mean[i] = mean;
          }

          // Calculate maximum data range of all fields,
          // restricted to the first 3 fields for 3D data plus extra fields.
          // NEW DIM.
          stats.maxRange = 0;
          for (i = 0; i < nbFields; i++) {
              let range = Math.abs(stats.field[i].range);
              if (range > stats.maxRange) {
                  stats.maxRange = range;
              }
          }
      }

      /**
       * Create separate arrays for data and labels,
       * Delete labels from the data array.
       */
      // NEW DIM
      function splitDataAndLabels() {
          labels = [];
          // Assume one class label in last field of data.
          for (let i = 0; i < data.length; i++) {
              labels.push(data[i].pop());
          }
      }

      // New DIM
      /**
       * Do not reset labels in case new/generated data is added.
       */
      function preprocessLabels() {
          for (let i = 0; i < labels.length; i++) {
              switch (labels[i]) {
                  case "Iris-setosa" :
                      labels[i] = 0;
                      break;
                  case "Iris-versicolor" :
                      labels[i] = 1;
                      break;
                  case "Iris-virginica" :
                      labels[i] = 2;
                      break;
              }
          }
      }

      /**
       *
       * @param n root number of data points
       * @param r radius
       * @param offset
       * @param label
       */
      function generateSphereData(n, r, offset, label) {
          data = (typeof data !== 'undefined') ? data : [];

          // DIM BEGIN EXERCISE Synthetische Daten generieren
          data.push([0,0,0,0]); // some dummy data
          data.push([2,0,0,1]); // some dummy data
          data.push([1,1,0,2]); // some dummy data
          // DIM END EXERCISE Synthetische Daten generieren
      }

      // NEW DIM
      function generateData() {

          // Generate some new data.
          data = [];

          // Generate one sphere.
          data.experiment = "one sphere";
          generateSphereData();

          splitDataAndLabels();
          preprocessLabels();
          calcStats();

          //Display experiment name.
          let elem = document.getElementById('experiment');
          elem.innerHTML = data.experiment+"  ";

          App.dataLoadedCallback(data, labels, stats);
      }

      // NEW DIM
      /**
       * Combine data and labels.
       * @returns {string} data as CSV
       */
      function dataToCSV() {
          // Deep copy data.
          let dat = JSON.parse(JSON.stringify(data));
          // Add labels to dat (as last argument).
          for (let i = 0; i < dat.length; i++) {
              dat[i].push(labels[i]);
          }
          return papaparse.unparse(dat);
      }

   // NEW DIM
      function linkDownload(a, filename, content) {
          let contentType =  'data:application/octet-stream,';
          let uriContent = contentType + encodeURIComponent(content);
          a.setAttribute('href', uriContent);
          a.setAttribute('download', filename);
      }

      // NEW DIM
      function downloadData() {
          let a = document.createElement('a');
          linkDownload(a, "data.csv", dataToCSV());
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }

      // NEW DIM
      function setData(dat) {
          data = dat;
      }

      return {
          init: init,
          readFileFromClient: readFileFromClient,
          readFileFromServer: readFileFromServer,
          // NEW DIM
          generateData : generateData,
          setData: setData,
          downloadData: downloadData
      };
  }());

  var tsne = createCommonjsModule(function (module) {
  // create main global object
  var tsnejs = tsnejs || { REVISION: 'ALPHA' };

  (function(global) {

    // utility function
    var assert = function(condition, message) {
      if (!condition) { throw message || "Assertion failed"; }
    };

    // syntax sugar
    var getopt = function(opt, field, defaultval) {
      if(opt.hasOwnProperty(field)) {
        return opt[field];
      } else {
        return defaultval;
      }
    };

    // return 0 mean unit standard deviation random number
    var return_v = false;
    var v_val = 0.0;
    var gaussRandom = function() {
      if(return_v) { 
        return_v = false;
        return v_val; 
      }
      var u = 2*Math.random()-1;
      var v = 2*Math.random()-1;
      var r = u*u + v*v;
      if(r == 0 || r > 1) return gaussRandom();
      var c = Math.sqrt(-2*Math.log(r)/r);
      v_val = v*c; // cache this for next function call for efficiency
      return_v = true;
      return u*c;
    };

    // return random normal number
    var randn = function(mu, std){ return mu+gaussRandom()*std; };

    // utilitity that creates contiguous vector of zeros of size n
    var zeros = function(n) {
      if(typeof(n)==='undefined' || isNaN(n)) { return []; }
      if(typeof ArrayBuffer === 'undefined') {
        // lacking browser support
        var arr = new Array(n);
        for(var i=0;i<n;i++) { arr[i]= 0; }
        return arr;
      } else {
        return new Float64Array(n); // typed arrays are faster
      }
    };

    // utility that returns 2d array filled with random numbers
    // or with value s, if provided
    var randn2d = function(n,d,s) {
      var uses = typeof s !== 'undefined';
      var x = [];
      for(var i=0;i<n;i++) {
        var xhere = [];
        for(var j=0;j<d;j++) { 
          if(uses) {
            xhere.push(s); 
          } else {
            xhere.push(randn(0.0, 1e-4)); 
          }
        }
        x.push(xhere);
      }
      return x;
    };

    // compute L2 distance between two vectors
    var L2 = function(x1, x2) {
      var D = x1.length;
      var d = 0;
      for(var i=0;i<D;i++) { 
        var x1i = x1[i];
        var x2i = x2[i];
        d += (x1i-x2i)*(x1i-x2i);
      }
      return d;
    };

    // compute pairwise distance in all vectors in X
    var xtod = function(X) {
      var N = X.length;
      var dist = zeros(N * N); // allocate contiguous array
      for(var i=0;i<N;i++) {
        for(var j=i+1;j<N;j++) {
          var d = L2(X[i], X[j]);
          dist[i*N+j] = d;
          dist[j*N+i] = d;
        }
      }
      return dist;
    };

    // compute (p_{i|j} + p_{j|i})/(2n)
    var d2p = function(D, perplexity, tol) {
      var Nf = Math.sqrt(D.length); // this better be an integer
      var N = Math.floor(Nf);
      assert(N === Nf, "D should have square number of elements.");
      var Htarget = Math.log(perplexity); // target entropy of distribution
      var P = zeros(N * N); // temporary probability matrix

      var prow = zeros(N); // a temporary storage compartment
      for(var i=0;i<N;i++) {
        var betamin = -Infinity;
        var betamax = Infinity;
        var beta = 1; // initial value of precision
        var done = false;
        var maxtries = 50;

        // perform binary search to find a suitable precision beta
        // so that the entropy of the distribution is appropriate
        var num = 0;
        while(!done) {
          //debugger;

          // compute entropy and kernel row with beta precision
          var psum = 0.0;
          for(var j=0;j<N;j++) {
            var pj = Math.exp(- D[i*N+j] * beta);
            if(i===j) { pj = 0; } // we dont care about diagonals
            prow[j] = pj;
            psum += pj;
          }
          // normalize p and compute entropy
          var Hhere = 0.0;
          for(var j=0;j<N;j++) {
            if(psum == 0) {
               var pj = 0;
            } else {
               var pj = prow[j] / psum;
            }
            prow[j] = pj;
            if(pj > 1e-7) Hhere -= pj * Math.log(pj);
          }

          // adjust beta based on result
          if(Hhere > Htarget) {
            // entropy was too high (distribution too diffuse)
            // so we need to increase the precision for more peaky distribution
            betamin = beta; // move up the bounds
            if(betamax === Infinity) { beta = beta * 2; }
            else { beta = (beta + betamax) / 2; }

          } else {
            // converse case. make distrubtion less peaky
            betamax = beta;
            if(betamin === -Infinity) { beta = beta / 2; }
            else { beta = (beta + betamin) / 2; }
          }

          // stopping conditions: too many tries or got a good precision
          num++;
          if(Math.abs(Hhere - Htarget) < tol) { done = true; }
          if(num >= maxtries) { done = true; }
        }

        // console.log('data point ' + i + ' gets precision ' + beta + ' after ' + num + ' binary search steps.');
        // copy over the final prow to P at row i
        for(var j=0;j<N;j++) { P[i*N+j] = prow[j]; }

      } // end loop over examples i

      // symmetrize P and normalize it to sum to 1 over all ij
      var Pout = zeros(N * N);
      var N2 = N*2;
      for(var i=0;i<N;i++) {
        for(var j=0;j<N;j++) {
          Pout[i*N+j] = Math.max((P[i*N+j] + P[j*N+i])/N2, 1e-100);
        }
      }

      return Pout;
    };

    // helper function
    function sign(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }

    var tSNE = function(opt) {
      var opt = opt || {};
      this.perplexity = getopt(opt, "perplexity", 30); // effective number of nearest neighbors
      this.dim = getopt(opt, "dim", 2); // by default 2-D tSNE
      this.epsilon = getopt(opt, "epsilon", 10); // learning rate

      this.iter = 0;
    };

    tSNE.prototype = {

      // this function takes a set of high-dimensional points
      // and creates matrix P from them using gaussian kernel
      initDataRaw: function(X) {
        var N = X.length;
        var D = X[0].length;
        assert(N > 0, " X is empty? You must have some data!");
        assert(D > 0, " X[0] is empty? Where is the data?");
        var dists = xtod(X); // convert X to distances using gaussian kernel
        this.P = d2p(dists, this.perplexity, 1e-4); // attach to object
        this.N = N; // back up the size of the dataset
        this.initSolution(); // refresh this
      },

      // this function takes a given distance matrix and creates
      // matrix P from them.
      // D is assumed to be provided as a list of lists, and should be symmetric
      initDataDist: function(D) {
        var N = D.length;
        assert(N > 0, " X is empty? You must have some data!");
        // convert D to a (fast) typed array version
        var dists = zeros(N * N); // allocate contiguous array
        for(var i=0;i<N;i++) {
          for(var j=i+1;j<N;j++) {
            var d = D[i][j];
            dists[i*N+j] = d;
            dists[j*N+i] = d;
          }
        }
        this.P = d2p(dists, this.perplexity, 1e-4);
        this.N = N;
        this.initSolution(); // refresh this
      },

      // (re)initializes the solution to random
      initSolution: function() {
        // generate random solution to t-SNE
        this.Y = randn2d(this.N, this.dim); // the solution
        this.gains = randn2d(this.N, this.dim, 1.0); // step gains to accelerate progress in unchanging directions
        this.ystep = randn2d(this.N, this.dim, 0.0); // momentum accumulator
        this.iter = 0;
      },

      // return pointer to current solution
      getSolution: function() {
        return this.Y;
      },

      // perform a single step of optimization to improve the embedding
      step: function() {
        this.iter += 1;
        var N = this.N;

        var cg = this.costGrad(this.Y); // evaluate gradient
        var cost = cg.cost;
        var grad = cg.grad;

        // perform gradient step
        var ymean = zeros(this.dim);
        for(var i=0;i<N;i++) {
          for(var d=0;d<this.dim;d++) {
            var gid = grad[i][d];
            var sid = this.ystep[i][d];
            var gainid = this.gains[i][d];

            // compute gain update
            var newgain = sign(gid) === sign(sid) ? gainid * 0.8 : gainid + 0.2;
            if(newgain < 0.01) newgain = 0.01; // clamp
            this.gains[i][d] = newgain; // store for next turn

            // compute momentum step direction
            var momval = this.iter < 250 ? 0.5 : 0.8;
            var newsid = momval * sid - this.epsilon * newgain * grad[i][d];
            this.ystep[i][d] = newsid; // remember the step we took

            // step!
            this.Y[i][d] += newsid; 

            ymean[d] += this.Y[i][d]; // accumulate mean so that we can center later
          }
        }

        // reproject Y to be zero mean
        for(var i=0;i<N;i++) {
          for(var d=0;d<this.dim;d++) {
            this.Y[i][d] -= ymean[d]/N;
          }
        }

        //if(this.iter%100===0) console.log('iter ' + this.iter + ', cost: ' + cost);
        return cost; // return current cost
      },

      // for debugging: gradient check
      debugGrad: function() {
        var N = this.N;

        var cg = this.costGrad(this.Y); // evaluate gradient
        var cost = cg.cost;
        var grad = cg.grad;

        var e = 1e-5;
        for(var i=0;i<N;i++) {
          for(var d=0;d<this.dim;d++) {
            var yold = this.Y[i][d];

            this.Y[i][d] = yold + e;
            var cg0 = this.costGrad(this.Y);

            this.Y[i][d] = yold - e;
            var cg1 = this.costGrad(this.Y);
            
            var analytic = grad[i][d];
            var numerical = (cg0.cost - cg1.cost) / ( 2 * e );
            console.log(i + ',' + d + ': gradcheck analytic: ' + analytic + ' vs. numerical: ' + numerical);

            this.Y[i][d] = yold;
          }
        }
      },

      // return cost and gradient, given an arrangement
      costGrad: function(Y) {
        var N = this.N;
        var dim = this.dim; // dim of output space
        var P = this.P;

        var pmul = this.iter < 100 ? 4 : 1; // trick that helps with local optima

        // compute current Q distribution, unnormalized first
        var Qu = zeros(N * N);
        var qsum = 0.0;
        for(var i=0;i<N;i++) {
          for(var j=i+1;j<N;j++) {
            var dsum = 0.0;
            for(var d=0;d<dim;d++) {
              var dhere = Y[i][d] - Y[j][d];
              dsum += dhere * dhere;
            }
            var qu = 1.0 / (1.0 + dsum); // Student t-distribution
            Qu[i*N+j] = qu;
            Qu[j*N+i] = qu;
            qsum += 2 * qu;
          }
        }
        // normalize Q distribution to sum to 1
        var NN = N*N;
        var Q = zeros(NN);
        for(var q=0;q<NN;q++) { Q[q] = Math.max(Qu[q] / qsum, 1e-100); }

        var cost = 0.0;
        var grad = [];
        for(var i=0;i<N;i++) {
          var gsum = new Array(dim); // init grad for point i
          for(var d=0;d<dim;d++) { gsum[d] = 0.0; }
          for(var j=0;j<N;j++) {
            cost += - P[i*N+j] * Math.log(Q[i*N+j]); // accumulate cost (the non-constant portion at least...)
            var premult = 4 * (pmul * P[i*N+j] - Q[i*N+j]) * Qu[i*N+j];
            for(var d=0;d<dim;d++) {
              gsum[d] += premult * (Y[i][d] - Y[j][d]);
            }
          }
          grad.push(gsum);
        }

        return {cost: cost, grad: grad};
      }
    };

    global.tSNE = tSNE; // export tSNE class
  })(tsnejs);


  // export the library to window, or to module in nodejs
  (function(lib) {
    {
      module.exports = lib; // in nodejs
    }
  })(tsnejs);
  });

  let App = (function () {

  	let gl;

  	// The shader program object is also used to
  	// store attribute and uniform locations.
  	// noinspection SpellCheckingInspection
  	let prog;

  	// Array of model objects.
  	let models = [];

  	let camera = {
  		// Initial position of the camera.
  		eye: fromValues$1(0, 0, 0),
  		//eye: [0, 0, 5],
  		// Point to look at.
  		center: [0, 0, 0],
  		// NAV BEGIN TEMPLATE OUT EXERCISE EULER
  		rotate: [0, 0, 0],
  		// NAV END TEMPLATE OUT EXERCISE EULER
  		// Opening angle given in radian.
  		// radian = degree*2*PI/360.
  		fovy: 60.0 * Math.PI / 180,
  		// Camera near plane dimensions:
  		// value for left right top bottom in projection.
  		lrtb: 2.0,
  		// View matrix.
  		vMatrix: create$1(),
  		// Projection matrix.
  		pMatrix: create$1(),
  		// Projection types: orthoData, ortho, perspective, frustum.
  		projectionType: "ortho",
  		// Angle to Z-Axis for camera when orbiting in X-Z-plane.
  		// given in radian.
  		zAngle: 0,
  		// Distance in XZ-Plane from center when orbiting.
  		distance: 4,

  		// NAV BEGIN TEMPLATE OUT SECTION ROTATE
  		// Comment out when the function factory in not in place.
  		/*
  		translate: function (vec) {
  			let M = mat4.create();
  			mat4.translate(M, M, vec);
  			mat4.multiply(this.vMatrix, M, this.vMatrix);
  		},
  		rotateX: function (angle) {
  			let M = mat4.create();
  			mat4.rotateX(M, M, angle);
  			mat4.multiply(this.vMatrix, M, this.vMatrix);
  		},
  		rotateY: function (angle) {
  			let M = mat4.create();
  			mat4.rotateY(M, M, angle);
  			mat4.multiply(this.vMatrix, M, this.vMatrix);
  		},
  		rotateZ: function (angle) {
  			let M = mat4.create();
  			mat4.rotateZ(M, M, angle);
  			mat4.multiply(this.vMatrix, M, this.vMatrix);
  		},
  		*/
  		// NAV END TEMPLATE OUT SECTION ROTATE
  		// NAV BEGIN TEMPLATE OUT EXERCISE FUNCTION FACTORY
  		// Function factory for the above translate, rotate functions.
  		init: function () {
  			["translate", "rotateX", "rotateY", "rotateZ"].forEach(function (f) {
  				camera[f] = function (val) {
  					let M = create$1();
  					mat4[f](M, M, val);
  					multiply(this.vMatrix, M, this.vMatrix);
  				};
  			});
  		}
  		// NAV END TEMPLATE OUT EXERCISE FUNCTION FACTORY
  	};

  	// Object with light sources characteristics in the scene.
  	let illumination = {
  		ambientLight: [.2, .2, .2],
  		light: [
  			{ isOn: true, position: [-3., 1., -3.], color: [1., 1., 1.] }
  		]
  	};

  	// NEW DIM
  	let tSNE;

  	function start() {
  		// Data.init();
  		init();
  		// NEW DIM
  		// render
  		// Generate or load data.
  		Data.readFileFromServer('./data/Seeds_dataset.csv');
  		// Data.generateData();
  		//Data.readFileFromServer('data/HabermansSurvivalDataSet/haberman.data');
  	}

  	function init() {
  		// NAV BEGIN TEMPLATE OUT EXERCISE FUNCTION FACTORY
  		camera.init();
  		// NAV END TEMPLATE OUT EXERCISE FUNCTION FACTORY
  		initWebGL();
  		initShaderProgram();
  		initUniforms();
  		initEventHandler();
  		initPipline();
  	}

  	function initWebGL() {
  		// Get canvas and WebGL context.
  		let canvas = document.getElementById('canvas');
  		gl = canvas.getContext('webgl');
  		gl.viewportWidth = canvas.width;
  		gl.viewportHeight = canvas.height;
  	}

  	/**
  	 * Init pipeline parameters that will not change again.
  	 * If projection or viewport change,
  	 * their setup must be in render function.
  	 */
  	function initPipline() {
  		gl.clearColor(.95, .95, .95, 1);

  		// Backface culling.
  		gl.frontFace(gl.CCW);
  		gl.enable(gl.CULL_FACE);
  		gl.cullFace(gl.BACK);

  		// Depth(Z)-Buffer.
  		gl.enable(gl.DEPTH_TEST);

  		// Polygon offset of rastered Fragments.
  		gl.enable(gl.POLYGON_OFFSET_FILL);
  		gl.polygonOffset(0.5, 0);

  		// Set viewport.
  		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

  		// Init camera.
  		// Set projection aspect ratio.
  		camera.aspect = gl.viewportWidth / gl.viewportHeight;
  	}

  	function initShaderProgram() {
  		// Init vertex shader.
  		let vs = initShader(gl.VERTEX_SHADER, VertexShader);
  		// Init fragment shader.
  		let fs = initShader(gl.FRAGMENT_SHADER, FragmentShader);
  		// Link shader into a shader program.
  		prog = gl.createProgram();
  		gl.attachShader(prog, vs);
  		gl.attachShader(prog, fs);
  		gl.bindAttribLocation(prog, 0, "aPosition");
  		gl.linkProgram(prog);
  		gl.useProgram(prog);
  	}

  	/**
  	 * Create and init shader from source.
  	 * @parameter shaderType: openGL shader type.
  	 * @parameter SourceTagId: Id of HTML Tag with shader source.
  	 * @returns WebGLShader.
  	 */
  	function initShader(shaderType, shaderSource) {
  		let shader = gl.createShader(shaderType);
  		// let shaderSource = document.getElementById(SourceTagId).text;
  		gl.shaderSource(shader, shaderSource);
  		gl.compileShader(shader);
  		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
  			console.log(SourceTagId + ": " + gl.getShaderInfoLog(shader));
  			return null;
  		}
  		return shader;
  	}

  	function initUniforms() {
  		// Projection Matrix.
  		prog.pMatrixUniform = gl.getUniformLocation(prog, "uPMatrix");

  		// Model-View-Matrix.
  		prog.mvMatrixUniform = gl.getUniformLocation(prog, "uMVMatrix");

  		// Normal Matrix.
  		prog.nMatrixUniform = gl.getUniformLocation(prog, "uNMatrix");

  		// Color.
  		prog.colorUniform = gl.getUniformLocation(prog, "uColor");

  		// Light.
  		prog.ambientLightUniform = gl.getUniformLocation(prog, "ambientLight");
  		// Array for light sources uniforms.
  		prog.lightUniform = [];
  		// Loop over light sources.
  		for (let j = 0; j < illumination.light.length; j++) {
  			let lightNb = "light[" + j + "]";
  			// Store one object for every light source.
  			let l = {};
  			l.isOn = gl.getUniformLocation(prog, lightNb + ".isOn");
  			l.position = gl.getUniformLocation(prog, lightNb + ".position");
  			l.color = gl.getUniformLocation(prog, lightNb + ".color");
  			prog.lightUniform[j] = l;
  		}

  		// Material.
  		prog.materialKaUniform = gl.getUniformLocation(prog, "material.ka");
  		prog.materialKdUniform = gl.getUniformLocation(prog, "material.kd");
  		prog.materialKsUniform = gl.getUniformLocation(prog, "material.ks");
  		prog.materialKeUniform = gl.getUniformLocation(prog, "material.ke");

  		// Texture.
  		prog.textureUniform = gl.getUniformLocation(prog, "uTexture");
  	}

  	function initTexture(model, filename) {
  		let texture = gl.createTexture();
  		model.texture = texture;
  		texture.loaded = false;
  		texture.image = new Image();
  		texture.image.onload = function () {
  			onloadTextureImage(texture);
  		};
  		texture.image.src = filename;
  	}

  	function onloadTextureImage(texture) {

  		texture.loaded = true;

  		// Use texture object.
  		gl.bindTexture(gl.TEXTURE_2D, texture);

  		// Assign image data
  		//gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);

  		// Set texture parameter.
  		// Wrap in S and T direction: CLAMP_TO_EDGE, REPEAT, MIRRORED_REPEAT
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  		// Min Filter: NEAREST,LINEAR, .. , LINEAR_MIPMAP_LINEAR,
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  		// Mag Filter: NEAREST,LINEAR
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  		// Use mip-Mapping.
  		gl.generateMipmap(gl.TEXTURE_2D);

  		// Release texture object.
  		gl.bindTexture(gl.TEXTURE_2D, null);

  		// Update the scene.
  		render();
  	}


  	/**
  	 * @paramter material : object with optional  ka, kd, ks, ke.
  	 * @retrun material : object with ka, kd, ks, ke.
  	 */
  	function createPhongMaterial(material) {
  		material = material || {};
  		// Set some default values,
  		// if not defined in material parameter.
  		material.ka = material.ka || [0.3, 0.3, 0.3];
  		material.kd = material.kd || [0.6, 0.6, 0.6];
  		material.ks = material.ks || [0.8, 0.8, 0.8];
  		material.ke = material.ke || 10.;

  		return material;
  	}

  	// Crate models from data
  	// Take first 3 fields as position.
  	// NEW DIM
  	function initModelsFromData(data, labels, stats) {
  		let fs = "fill";

  		let mRed = createPhongMaterial({ kd: [1., 0., 0.] });
  		let mGreen = createPhongMaterial({ kd: [0., 1., 0.] });
  		let mBlue = createPhongMaterial({ kd: [0., 0., 1.] });
  		let mYellow = createPhongMaterial({ kd: [1., 1., 0.] });
  		let mCyan = createPhongMaterial({ kd: [0., 1., 1.] });
  		let mMagenta = createPhongMaterial({ kd: [1., 0., 1.] });
  		//let mWhite = createPhongMaterial({kd: [1., 1., 1.]});

  		let materials = [mRed, mGreen, mBlue, mYellow, mCyan, mMagenta];

  		// Clear models for new data
  		models = [];
  		for (let i = 0; i < data.length; i++) {
  			let d = data[i];
  			// Set color according to classification.
  			// NEW DIM
  			let pos = Array(3).fill(0);
  			//let pos = [d[0], d[1], d[2]];
  			// Set dimension of the projection.
  			let l = Math.min(d.length, 3);
  			for (let j = 0; j < l; j++) {
  				pos[j] = d[j];
  			}
  			// Scale model (like point size) according to data range and data set size.
  			let scale = stats.maxRange / 100;
  			//let scale = stats.maxRange / 100 * camera.lrtb;
  			//let scale = Math.max(stats.maxRange / 100, camera.lrtb * 0.01);
  			let scale3f = [scale, scale, scale];
  			createModel(Sphere.createVertexData(), fs, [1, 1, 1, 1], pos, [0, 0, 0], scale3f, materials[labels[i]]);
  		}
  	}


  	// NEW DIM
  	function rescaleModels(factor) {
  		for (let i = 0; i < models.length; i++) {
  			models[i].scale[0] *= factor;
  			models[i].scale[1] *= factor;
  			models[i].scale[2] *= factor;
  		}
  	}

  	// NEW DIM
  	/**
  	 * Assume that the order of data points in data matches the model objects in models.
  	 * @param data
  	 */
  	function setModelTransformationFromData(data) {
  		for (let i = 0; i < data.length; i++) {
  			let d = data[i];
  			let pos = Array(3).fill(0);
  			let l = Math.min(d.length, 3);
  			for (let j = 0; j < l; j++) {
  				pos[j] = d[j];
  			}
  			models[i].translate = pos;
  		}
  	}

  	/**
  	 * Create model object, fill it and push it in models array.
  	 * @parameter geometryname: string with name of geometry.
  	 * @parameter fillstyle: wireframe, fill, fillwireframe.
  	 */
  	function createModel(geometryname, fillstyle, color, translate, rotate, scale, material, textureFilename) {
  		let model = {};
  		model.fillstyle = fillstyle;
  		model.color = color;
  		initDataAndBuffers(model, geometryname);
  		initTransformations(model, translate, rotate, scale);
  		if (textureFilename) {
  			initTexture(model, textureFilename);
  		}
  		model.material = material;

  		models.push(model);
  	}

  	/**
  	 * Set scale, rotation and transformation for model.
  	 */
  	function initTransformations(model, translate, rotate, scale) {
  		// Store transformation vectors.
  		model.translate = translate;
  		model.rotate = rotate;
  		model.scale = scale;

  		// Create and initialize Model-Matrix.
  		model.mMatrix = create$1();

  		// Create and initialize Model-View-Matrix.
  		model.mvMatrix = create$1();

  		// Create and initialize Normal Matrix.
  		model.nMatrix = create();
  	}

  	/**
  	 * Init data and buffers for model object.
  	 * @parameter model: a model object to augment with data
  	 * @parameter geometryname: string with name of geometry.
  	 */
  	function initDataAndBuffers(model, geometry) {
  		// Provide model object with vertex data arrays.
  		// Fill data arrays for Vertex-Positions, Normals, Index data:
  		// vertices, normals, indicesLines, indicesTris;
  		// Pointer this refers to the window.
  		// this[geometryname]['createVertexData'].apply(model);
  		Object.assign(model, geometry);

  		// Setup position vertex buffer object.
  		model.vboPos = gl.createBuffer();
  		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboPos);
  		gl.bufferData(gl.ARRAY_BUFFER, model.vertices, gl.STATIC_DRAW);
  		// Bind vertex buffer to attribute variable.
  		prog.positionAttrib = gl.getAttribLocation(prog, 'aPosition');
  		gl.enableVertexAttribArray(prog.positionAttrib);

  		// Setup normal vertex buffer object.
  		model.vboNormal = gl.createBuffer();
  		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboNormal);
  		gl.bufferData(gl.ARRAY_BUFFER, model.normals, gl.STATIC_DRAW);
  		// Bind buffer to attribute variable.
  		prog.normalAttrib = gl.getAttribLocation(prog, 'aNormal');
  		gl.enableVertexAttribArray(prog.normalAttrib);

  		if (model.texture) {
  			// Setup texture coordinat vertex buffer object.
  			model.vboTextureCoord = gl.createBuffer();
  			gl.bindBuffer(gl.ARRAY_BUFFER, model.vboTextureCoord);
  			gl.bufferData(gl.ARRAY_BUFFER, model.textureCoord, gl.STATIC_DRAW);
  			// Bind buffer to attribute variable.
  			prog.textureCoordAttrib = gl.getAttribLocation(prog, 'aTextureCoord');
  			gl.enableVertexAttribArray(prog.textureCoordAttrib);
  		}

  		// Setup lines index buffer object.
  		model.iboLines = gl.createBuffer();
  		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
  		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.indicesLines, gl.STATIC_DRAW);
  		model.iboLines.numberOfElements = model.indicesLines.length;
  		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  		// Setup triangle index buffer object.
  		model.iboTris = gl.createBuffer();
  		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboTris);
  		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.indicesTris, gl.STATIC_DRAW);
  		model.iboTris.numberOfElements = model.indicesTris.length;
  		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  	}

  	function initEventHandler() {
  		// Rotation step for models.
  		let deltaRotate = Math.PI / 36;
  		let deltaTranslate = 0.05;

  		window.onkeydown = function (evt) {
  			let key = evt.which ? evt.which : evt.keyCode;
  			let c = String.fromCharCode(key);
  			//console.log(evt);
  			// Use shift key to change sign.
  			let sign = evt.shiftKey ? -1 : 1;

  			// NAV BEGIN TEMPLATE OUT SECTION TRANSLATE
  			// Camera translation.
  			let translateStep = camera.lrtb * deltaTranslate;
  			switch (c) {
  				// Move the camera position.
  				case ('W'):
  					camera.translate([0, -translateStep, 0]);
  					break;
  				case ('A'):
  					camera.translate([translateStep, 0, 0]);
  					break;
  				case ('S'):
  					camera.translate([0, translateStep, 0]);
  					break;
  				case ('D'):
  					camera.translate([-translateStep, 0, 0]);
  					break;
  				case (' '):
  					camera.translate([0, 0, translateStep]);
  					break;
  			}
  			// NAV END TEMPLATE OUT SECTION TRANSLATE

  			// NAV BEGIN TEMPLATE COMMENT IN
  			/*
  			// Rotate interactiveModel.
  			switch(c) {
  				case('X'):
  					interactiveModel.rotate[0] += sign * deltaRotate;
  					break;
  				case('Y'):
  					interactiveModel.rotate[1] += sign * deltaRotate;
  					break;
  				case('Z'):
  					interactiveModel.rotate[2] += sign * deltaRotate;
  					break;
  			}
  			*/
  			// NAV END TEMPLATE COMMENT IN

  			// NAV BEGIN TEMPLATE OUT SECTION ROTATE
  			// Rotate.
  			let rotateStep = deltaRotate * sign;
  			switch (c) {
  				case ('X'):
  					camera.rotateX(rotateStep);
  					break;
  				case ('Y'):
  					camera.rotateY(rotateStep);
  					break;
  				case ('Z'):
  					camera.rotateZ(rotateStep);
  					break;
  			}
  			// Change projection of scene.
  			switch (c) {
  				case ('O'):
  					camera.projectionType = "ortho";
  					camera.lrtb = 2;
  					break;
  				case ('F'):
  					camera.projectionType = "frustum";
  					camera.lrtb = 1.2;
  					break;
  				case ('P'):
  					camera.projectionType = "perspective";
  					break;
  			}
  			// Camera move and orbit.
  			switch (c) {
  				case ('C'):
  					// Orbit camera around Y-Axis.
  					camera.zAngle += sign * deltaRotate;
  					break;
  				case ('H'):
  					// Move camera up and down.
  					camera.eye[1] += sign * deltaTranslate;
  					break;
  				case ('D'):
  					// Camera distance to center.
  					camera.distance += sign * deltaTranslate;
  					break;
  				case ('V'):
  					// Camera fovy in radian.
  					camera.fovy += sign * 5 * Math.PI / 180;
  					break;
  				case ('B'):
  					// Zoom in and out of the data.
  					// NEW DIM
  					let factor = 1.0 - sign * 0.1;
  					camera.lrtb *= factor;
  					rescaleModels(factor);
  					break;
  			}

  			// Load data.
  			switch (c) {
  				case ('L'):
  					Data.readFileFromClient();
  					// No need to render, done in callback.
  					return;
  			}

  			// NEW DIM
  			// Save Data
  			switch (c) {
  				case ('K'):
  					Data.setData(tSNE.getSolution());
  					Data.downloadData();
  					// No need to render.
  					return;
  			}
  			// NEW DIM
  			// tSNE.
  			switch (c) {
  				case ('T'):
  					step_tSNE(1);
  					break;
  			}


  			// Render the scene again on any key pressed.
  			render();
  		};
  	}

  	/**
  	 * Run the rendering pipeline.
  	 */
  	function render() {
  		// Clear framebuffer and depth-/z-buffer.
  		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  		setProjection();

  		//calculateCameraOrbit();

  		// Set view matrix depending on camera.
  		//mat4.lookAt(camera.vMatrix, camera.eye, camera.center, camera.up);

  		// NAV BEGIN TEMPLATE COMMENT IN
  		//calculateCamera();
  		// NAV END TEMPLATE COMMENT IN

  		// Set light uniforms.
  		gl.uniform3fv(prog.ambientLightUniform, illumination.ambientLight);
  		// Loop over light sources.
  		for (let j = 0; j < illumination.light.length; j++) {
  			// bool is transferred as integer.
  			gl.uniform1i(prog.lightUniform[j].isOn, illumination.light[j].isOn ? 1 : 0);
  			// Tranform light position in eye coordinates.
  			// Copy current light position into a new array.
  			let lightPos = [].concat(illumination.light[j].position);
  			// Add homogeneous coordinate for transformation.
  			lightPos.push(1.0);
  			transformMat4(lightPos, lightPos, camera.vMatrix);
  			// Remove homogeneous coordinate.
  			lightPos.pop();
  			gl.uniform3fv(prog.lightUniform[j].position, lightPos);
  			gl.uniform3fv(prog.lightUniform[j].color, illumination.light[j].color);
  		}

  		// Loop over models.
  		for (let i = 0; i < models.length; i++) {

  			if (models[i].texture && !models[i].texture.loaded) {
  				// Leave out this model for now.
  				// When the texture is loaded the onload will request a scene update.
  				continue;
  			}
  			// Update modelview for model.
  			updateTransformations(models[i]);

  			// Set uniforms for model.
  			//
  			// Transformation matrices.
  			gl.uniformMatrix4fv(prog.mvMatrixUniform, false, models[i].mvMatrix);
  			gl.uniformMatrix3fv(prog.nMatrixUniform, false, models[i].nMatrix);
  			// Color (not used with lights).
  			gl.uniform4fv(prog.colorUniform, models[i].color);
  			// Material.
  			gl.uniform3fv(prog.materialKaUniform, models[i].material.ka);
  			gl.uniform3fv(prog.materialKdUniform, models[i].material.kd);
  			gl.uniform3fv(prog.materialKsUniform, models[i].material.ks);
  			gl.uniform1f(prog.materialKeUniform, models[i].material.ke);

  			//Texture.
  			if (models[i].texture) {
  				gl.activeTexture(gl.TEXTURE0);
  				gl.bindTexture(gl.TEXTURE_2D, models[i].texture);
  				gl.uniform1i(prog.textureUniform, 0);
  			}
  			draw(models[i]);
  		}
  	}

  	/*
  	function calculateCamera() {
  	
  		let vMatrix = camera.vMatrix;
  		mat4.identity(vMatrix);
  	
  		// NAV BEGIN TEMPLATE OUT EXERCISE EULER
  	
  		// Rotate.
  		mat4.rotateX(vMatrix, vMatrix, camera.rotate[0]);
  		mat4.rotateY(vMatrix, vMatrix, camera.rotate[1]);
  		mat4.rotateZ(vMatrix, vMatrix, camera.rotate[2]);
  	
  		// NAV BEGIN TEMPLATE OUT EXERCISE EULER
  	
  		// Translate.
  		let trans = vec3.clone(camera.eye);
  		vec3.scale(trans, trans, -1.0);
  		mat4.translate(vMatrix, vMatrix, trans);
  	}
  	*/

  	/*
  	function calculateCameraOrbit() {
  		// Calculate x,z position/eye of camera orbiting the center.
  		let x = 0, z = 2;
  		camera.eye[x] = camera.center[x];
  		camera.eye[z] = camera.center[z];
  		camera.eye[x] += camera.distance * Math.sin(camera.zAngle);
  		camera.eye[z] += camera.distance * Math.cos(camera.zAngle);
  	}
  	*/

  	/*
  		Consider only the first three fields of our data
  	 */
  	function initCameraFromData(stats) {

  		camera.projectionType = "ortho";
  		// NAV BEGIN TEMPLATE IN SECTION FLIGHT
  		//camera.projectionType = "perspective";
  		// NAV END TEMPLATE IN SECTION FLIGHT

  		// Set Frustum according to data range.
  		// Use same extend in all dimensions to keep data ratio.
  		camera.lrtb = stats.maxRange;
  		camera.distance = 0;

  		// Locate the camera (eye) in the center of the data to rotate it.
  		// Data points inside the ortho frustum are all rendered.
  		copy$1(camera.eye, stats.mean);

  		// NAV BEGIN TEMPLATE OUT SECTION ROTATE
  		let vMatrix = camera.vMatrix;
  		identity(vMatrix);

  		// Translate.
  		let trans = clone$1(camera.eye);
  		scale$1(trans, trans, -1.0);
  		translate(vMatrix, vMatrix, trans);
  		// NAV END TEMPLATE OUT SECTION ROTATE
  	}

  	function setProjection() {
  		let v;
  		// Set projection Matrix.
  		switch (camera.projectionType) {
  			case ("ortho"):
  				v = camera.lrtb;
  				ortho(camera.pMatrix, -v, v, -v, v, -v, v);
  				// NAV BEGIN TEMPLATE OUT SECTION ZOOM
  				ortho(camera.pMatrix, -v, v, -v, v, -1000, 1000);
  				// NAV END TEMPLATE OUT SECTION ZOOM
  				break;
  			case ("frustum"):
  				v = camera.lrtb;
  				frustum(camera.pMatrix, -v / 2, v / 2, -v / 2, v / 2, 1, 10);
  				break;
  			case ("perspective"):
  				perspective(camera.pMatrix, camera.fovy, camera.aspect, 1, 10);
  				// NAV BEGIN TEMPLATE OUT SECTION FLIGHT
  				perspective(camera.pMatrix, camera.fovy, camera.aspect, 1, camera.lrtb);
  				// NAV END TEMPLATE OUT SECTION FLIGHT
  				break;
  		}
  		// Set projection uniform.
  		gl.uniformMatrix4fv(prog.pMatrixUniform, false, camera.pMatrix);
  	}

  	/**
  	 * Update model-view matrix for model.
  	 */
  	function updateTransformations(model) {

  		// Use shortcut variables.
  		let mMatrix = model.mMatrix;
  		let mvMatrix = model.mvMatrix;

  		// Reset matrices to identity.
  		identity(mMatrix);
  		identity(mvMatrix);

  		// Translate.
  		translate(mMatrix, mMatrix, model.translate);
  		// Rotate.
  		rotateX(mMatrix, mMatrix, model.rotate[0]);
  		rotateY(mMatrix, mMatrix, model.rotate[1]);
  		rotateZ(mMatrix, mMatrix, model.rotate[2]);
  		// Scale
  		scale(mMatrix, mMatrix, model.scale);

  		// Combine view and model matrix
  		// by matrix multiplication to mvMatrix.
  		multiply(mvMatrix, camera.vMatrix, mMatrix);

  		// Calculate normal matrix from model matrix.
  		normalFromMat4(model.nMatrix, mvMatrix);
  	}

  	function draw(model) {
  		// Setup position VBO.
  		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboPos);
  		gl.vertexAttribPointer(prog.positionAttrib, 3, gl.FLOAT, false, 0, 0);

  		// Setup normal VBO.
  		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboNormal);
  		gl.vertexAttribPointer(prog.normalAttrib, 3, gl.FLOAT, false, 0, 0);

  		if (model.texture) {
  			// Setup Texture VBO.
  			gl.bindBuffer(gl.ARRAY_BUFFER, model.vboTextureCoord);
  			gl.vertexAttribPointer(prog.textureCoordAttrib, 2, gl.FLOAT, false, 0, 0);
  		}
  		// Setup rendering tris.
  		let fill = (model.fillstyle.search(/fill/) !== -1);
  		if (fill) {
  			gl.enableVertexAttribArray(prog.normalAttrib);
  			if (model.texture) {
  				gl.enableVertexAttribArray(prog.textureCoordAttrib);
  			}
  			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboTris);
  			gl.drawElements(gl.TRIANGLES, model.iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);
  		}

  		// Setup rendering lines.
  		let wireframe = (model.fillstyle.search(/wireframe/) !== -1);
  		if (wireframe) {
  			gl.uniform4fv(prog.colorUniform, [0., 0., 0., 1.]);
  			gl.disableVertexAttribArray(prog.normalAttrib);
  			if (model.texture) {
  				gl.disableVertexAttribArray(prog.textureCoordAttrib);
  			}
  			gl.vertexAttrib3f(prog.normalAttrib, 0, 0, 0);
  			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
  			gl.drawElements(gl.LINES, model.iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);
  		}
  	}

  	// NEW DIM
  	function init_tSNE(data) {
  		let opt = {};
  		opt.epsilon = 2; // epsilon is learning rate (10 = default)
  		opt.perplexity = 10; // roughly how many neighbors each point influences (30 = default)
  		opt.dim = 3; // dimensionality of the embedding (2 = default)

  		tSNE = new tsne.tSNE(opt); // create a tSNE instance

  		// Init from raw data (do not from a distance matrix, which is an other option).
  		// The data is stored within t-SNE. Thus the data object can be re-used.
  		tSNE.initDataRaw(data);

  		displayParameter_tSNE();
  		displayStepCounter_tSNE();
  	}

  	// NEW DIM
  	function step_tSNE(nbSteps) {
  		nbSteps = (typeof nbSteps !== 'undefined') ? nbSteps : 1;

  		for (let k = 0; k < nbSteps; k++) {
  			tSNE.step();
  		}
  		let map = tSNE.getSolution();

  		setModelTransformationFromData(map);

  		// The Data gets centered by tSNE,
  		// thus we reset the camera translation to the origin.
  		if (tSNE.iter === 1) { identity(camera.vMatrix); }

  		displayStepCounter_tSNE();
  	}

  	// NEW DIM
  	function displayParameter_tSNE() {
  		// Display parameter.
  		let elem = document.getElementById('para');
  		elem.innerHTML = " epsilon:" + tSNE.epsilon;
  		elem.innerHTML += " perplexity:" + tSNE.perplexity;
  		elem.innerHTML += " dim:" + tSNE.dim;
  	}

  	// NEW DIM
  	function displayStepCounter_tSNE() {
  		let elem = document.getElementById('step');
  		elem.innerHTML = " step:" + tSNE.iter;
  	}

  	// NEW DIM / change
  	function dataLoadedCallback(data, labels, stats) {

  		initModelsFromData(data, labels, stats);
  		initCameraFromData(stats);
  		render();

  		init_tSNE(data);
  	}

  	// App interface.
  	return {
  		start: start,
  		dataLoadedCallback: dataLoadedCallback
  	};
  }());

  document.body.onload = () => {
      App.start();
  };

}());
//# sourceMappingURL=bundle.js.map
