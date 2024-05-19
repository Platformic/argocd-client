import test, { describe } from "node:test";
import assert from "node:assert";
import { validateResponse, HttpClientErrors, buildUrl } from "./http-client.js";
import { env } from "./env.js";

describe('HttpClient tests', () => {
  test('Validate response status 404', () => {
    assert.throws(() => validateResponse(404), Error(HttpClientErrors.NotFound))
  })

  test('Validate response status 500', () => {
    assert.throws(() => validateResponse(500), Error(HttpClientErrors.ServerError))
  })

  test('Validate response status 403', () => {
    assert.throws(() => validateResponse(403), Error(HttpClientErrors.AccessDenied))
  })

  test('Validate response status 200', () => {
    assert.doesNotThrow(() => validateResponse(200))
  })

  test('Validate URL build without params', () => {
    const mockUrl = '/api/v1/test'
    assert.equal(buildUrl(mockUrl), `${env.ARGOCD_API_URL}${mockUrl}`)
  })

  test('Validate URL build with params', () => {
    const mockUrl = '/api/v1/test'
    const mockParams = { test: 1, test1: 2 } as any
    assert.equal(buildUrl(mockUrl,mockParams), `${env.ARGOCD_API_URL}${mockUrl}?${new URLSearchParams(mockParams)}`)
  })
})