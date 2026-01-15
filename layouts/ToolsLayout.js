import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'

export default function ToolsLayout() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Tools
          </h1>
        </div>
        <ul>
          <li key={1} className="p-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <div className="space-y-3 xl:col-span-3">
                <Link
                  href="http://www.zeus-audit.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-900 dark:text-gray-100"
                >
                  <div>
                    <h3 className="text-2xl font-bold leading-8 tracking-tight">Zeus Audit ⚡️</h3>
                  </div>
                  <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                    AI auditing SaaS. Perfect for your every day auditing needs.
                  </div>
                  <p className="mt-2 text-base font-medium leading-6 text-primary-500 hover:text-primary-800 dark:hover:text-primary-400">
                    Try out &rarr;
                  </p>
                </Link>
              </div>
            </article>
          </li>
          <li key={1} className="p-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <div className="space-y-3 xl:col-span-3">
                <Link href="/allowanceCleaner" className="text-gray-900 dark:text-gray-100">
                  <div>
                    <h3 className="text-2xl font-bold leading-8 tracking-tight">
                      Allowance Cleaner 🧹
                    </h3>
                  </div>
                  <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                    Tool to help you revoke your ERC20 token allowance.
                  </div>
                  <p className="mt-2 text-base font-medium leading-6 text-primary-500 hover:text-primary-800 dark:hover:text-primary-400">
                    Try out &rarr;
                  </p>
                </Link>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </>
  )
}
