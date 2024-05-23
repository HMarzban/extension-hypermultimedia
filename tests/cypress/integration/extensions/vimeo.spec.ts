/// <reference types="cypress" />

import { Editor } from '@tiptap/core'
import { HyperMultimediaKit } from '@docs.plus/extension-hypermultimedia'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'

describe('Vimeo URLs', () => {
  const editorElClass = 'tiptap'

  let editor: Editor

  const createEditorEl = () => {
    const editorEl = document.createElement('div')

    editorEl.classList.add(editorElClass)

    document.body.appendChild(editorEl)

    return editorEl
  }

  const getEditorEl = () => document.querySelector(`.${editorElClass}`)

  describe('renderHTML', () => {
    const buildEditor = (src) => {
      editor = new Editor({
        element: createEditorEl(),
        extensions: [
          Document,
          Text,
          Paragraph,
          HyperMultimediaKit,
        ],
        content: {
          type: 'doc',
          content: [
            {
              type: 'Vimeo',
              attrs: {
                src: src
              },
            },
          ],
        },
      })
    }

    afterEach(() => {
      editor.destroy()
      getEditorEl()?.remove()
    })

    describe('with public videos', () => {
      beforeEach(() => {
        buildEditor('https://player.vimeo.com/video/123456789')
      })

      it('renders a Vimeo player iframe', () => {
        expect(getEditorEl()?.querySelector('iframe')?.src).to.eq('https://player.vimeo.com/video/123456789')
      })
    })

    describe('with private videos', () => {
      beforeEach(() => {
        buildEditor('https://player.vimeo.com/video/123456789?h=deadbeef')
      })

      it('renders a Vimeo player iframe', () => {
        expect(getEditorEl()?.querySelector('iframe')?.src).to.eq('https://player.vimeo.com/video/123456789?h=deadbeef')
      })
    })
  })

  describe('parseHTML', () => {
    const buildEditor = () => {
      editor = new Editor({
        element: createEditorEl(),
        extensions: [
          Document,
          Text,
          Paragraph,
          HyperMultimediaKit,
        ],
        content: '<div></div>',
      })
    }

    afterEach(() => {
      editor.destroy()
      getEditorEl()?.remove()
    })

    describe('with public videos', () => {
      beforeEach(() => {
        buildEditor()
      })

      it('converts the URL', () => {
        editor.commands.setVimeo({
          src: 'https://vimeo.com/123456789'
        })

        const src = getEditorEl()?.querySelector('iframe')?.src,
          url = new URL(src)

        expect(url.origin).to.eq('https://player.vimeo.com')
        expect(url.pathname).to.eq('/video/123456789')
        expect(url.searchParams.get('h')).to.eq(null)
      })
    })

    describe('with private videos', () => {
      beforeEach(() => {
        buildEditor()
      })

      it('converts the URL and maintains the h value', () => {
        editor.commands.setVimeo({
          src: 'https://vimeo.com/123456789/deadbeef'
        })

        const src = getEditorEl()?.querySelector('iframe')?.src,
          url = new URL(src)

        expect(url.origin).to.eq('https://player.vimeo.com')
        expect(url.pathname).to.eq('/video/123456789')
        expect(url.searchParams.get('h')).to.eq('deadbeef')
      })
    })
  })
})
