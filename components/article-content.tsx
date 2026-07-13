import { Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import type { ArticleContentBlock } from '@/lib/articles-data'

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const regex = /\[(.+?)\]\((.+?)\)|\*\*(.+?)\*\*|\*(.+?)\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    if (match[1] !== undefined) {
      nodes.push(
        <Link
          key={`${keyPrefix}-${i++}`}
          href={match[2]}
          className="underline underline-offset-2 transition-opacity hover:opacity-70"
          style={{ color: '#1b2c1a' }}
        >
          {match[1]}
        </Link>
      )
    } else if (match[3] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-${i++}`} style={{ color: '#1b2c1a', fontWeight: 700 }}>
          {match[3]}
        </strong>
      )
    } else if (match[4] !== undefined) {
      nodes.push(<em key={`${keyPrefix}-${i++}`}>{match[4]}</em>)
    }
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function InlineImagePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="w-full aspect-video rounded-[3px] my-8 flex items-center justify-center"
      style={{ backgroundColor: '#1b2c1a' }}
    >
      <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(238, 229, 200, 0.25)' }}>
        Imagine articol
      </p>
    </div>
  )
}

interface ArticleContentProps {
  blocks: ArticleContentBlock[]
}

export default function ArticleContent({ blocks }: ArticleContentProps) {
  const headingIndices = blocks.reduce<number[]>((acc, block, i) => {
    if (block.type === 'heading') acc.push(i)
    return acc
  }, [])
  const imageBeforeIndices = new Set(
    [headingIndices[2], headingIndices[5]].filter((i): i is number => i !== undefined)
  )

  return (
    <div className="max-w-none">
      {blocks.map((block, idx) => {
        const key = `block-${idx}`
        const imageBefore = imageBeforeIndices.has(idx) ? <InlineImagePlaceholder key={`${key}-img`} /> : null

        switch (block.type) {
          case 'lead':
            return (
              <p
                key={key}
                className="article-lead text-base md:text-lg leading-relaxed mb-6"
                style={{ color: '#5a5a4a' }}
              >
                {renderInline(block.text, key)}
              </p>
            )

          case 'heading':
            return (
              <Fragment key={key}>
                {imageBefore}
                <h2
                  className="text-xl font-extrabold leading-snug mt-9 mb-3 tracking-tight"
                  style={{ color: '#1b2c1a' }}
                >
                  {block.text}
                </h2>
              </Fragment>
            )

          case 'paragraph':
            return (
              <p key={key} className="text-[15px] leading-[1.85] mb-5" style={{ color: '#5a5a4a' }}>
                {renderInline(block.text, key)}
              </p>
            )

          case 'quote':
            return (
              <blockquote
                key={key}
                className="my-8 pl-6 py-1 border-l-[3px]"
                style={{ borderColor: '#5a5a4a' }}
              >
                <p className="text-lg md:text-xl font-semibold leading-snug" style={{ color: '#1b2c1a' }}>
                  {renderInline(block.text, key)}
                </p>
              </blockquote>
            )

          case 'list': {
            const ListTag = block.ordered ? 'ol' : 'ul'
            return (
              <ListTag
                key={key}
                className={`mb-5 pl-5 space-y-2 text-[15px] leading-[1.85] ${block.ordered ? 'list-decimal' : 'list-disc'}`}
                style={{ color: '#5a5a4a' }}
              >
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{renderInline(item, `${key}-${itemIdx}`)}</li>
                ))}
              </ListTag>
            )
          }

          case 'table':
            return (
              <div
                key={key}
                className="my-8 overflow-x-auto rounded-[3px] border"
                style={{ borderColor: 'rgba(27, 44, 26, 0.12)' }}
              >
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(27, 44, 26, 0.04)' }}>
                      {block.headers.map((h, i) => (
                        <th
                          key={i}
                          className="text-left font-bold px-4 py-3 border-b"
                          style={{ color: '#1b2c1a', borderColor: 'rgba(27, 44, 26, 0.12)' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="border-b last:border-0"
                        style={{ borderColor: 'rgba(27, 44, 26, 0.08)' }}
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-4 py-3"
                            style={{ color: ci === 0 ? '#1b2c1a' : '#5a5a4a', fontWeight: ci === 0 ? 700 : 400 }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'faq':
            return (
              <div key={key} className="mt-8 border-t" style={{ borderColor: 'rgba(27, 44, 26, 0.12)' }}>
                {block.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="py-6 border-b"
                    style={{ borderColor: 'rgba(27, 44, 26, 0.12)' }}
                  >
                    <p className="text-[15px] font-bold mb-2" style={{ color: '#1b2c1a' }}>
                      {item.question}
                    </p>
                    <p className="text-[15px] leading-[1.85]" style={{ color: '#5a5a4a' }}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
