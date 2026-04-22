'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

// ── TYPES ─────────────────────────────────────────────────────
type TxType = 'income' | 'expense'

interface Transaction {
  id: string
  type: TxType
  category: string
  amount: number
  description: string
  date: string
}

const INCOME_CATEGORIES  = ['Sales', 'Service fee', 'Transfer received', 'Loan in', 'Other income']
const EXPENSE_CATEGORIES = ['Stock/Supplies', 'Transport', 'Rent', 'Salary/Labour', 'Food & Water', 'Data & Airtime', 'Equipment', 'Government/Tax', 'Loan repayment', 'Marketing', 'Other expense']

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function fmt(n: number) {
  return '₦' + Math.abs(n).toLocaleString('en-NG', { minimumFractionDigits: 0 })
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export default function BizBooksClient({ hasAccess }: { hasAccess: boolean }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const raw = localStorage.getItem('meridian_bizbooks')
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })

  const [tab, setTab]       = useState<'overview' | 'add' | 'history'>('overview')
  const [txType, setTxType] = useState<TxType>('income')
  const [form, setForm]     = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
  })
  const [saved, setSaved]   = useState(false)

  function save(txs: Transaction[]) {
    setTransactions(txs)
    try { localStorage.setItem('meridian_bizbooks', JSON.stringify(txs)) } catch {}
  }

  function addTransaction() {
    if (!form.amount || !form.category) return
    const amount = parseFloat(form.amount.replace(/,/g, ''))
    if (isNaN(amount) || amount <= 0) return

    const tx: Transaction = {
      id: uid(),
      type: txType,
      category: form.category,
      amount,
      description: form.description.trim(),
      date: form.date,
    }
    const updated = [tx, ...transactions]
    save(updated)
    setForm({ category: '', amount: '', description: '', date: new Date().toISOString().slice(0, 10) })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    setTab('overview')
  }

  function deleteTransaction(id: string) {
    save(transactions.filter(t => t.id !== id))
  }

  // ── CALCULATIONS ────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const profit       = totalIncome - totalExpense
    const margin       = totalIncome > 0 ? (profit / totalIncome) * 100 : 0

    // By month
    const byMonth: Record<string, { income: number; expense: number }> = {}
    transactions.forEach(t => {
      const key = t.date.slice(0, 7) // YYYY-MM
      if (!byMonth[key]) byMonth[key] = { income: 0, expense: 0 }
      if (t.type === 'income')  byMonth[key].income  += t.amount
      else                       byMonth[key].expense += t.amount
    })

    // By category
    const byCat: Record<string, number> = {}
    transactions.filter(t => t.type === 'expense').forEach(t => {
      byCat[t.category] = (byCat[t.category] || 0) + t.amount
    })
    const topExpenses = Object.entries(byCat).sort((a, b) => b[1] - a[1]).slice(0, 5)

    return { totalIncome, totalExpense, profit, margin, byMonth, topExpenses }
  }, [transactions])

  const categories = txType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  if (!hasAccess) {
    return (
      <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <header className="dash-header">
          <div className="dash-logo">
            <span className="dash-logo-mark">⊞</span>
            <span className="dash-logo-name">BizBooks</span>
          </div>
          <div className="dash-header-right">
            <Link href="/dashboard" className="btn btn-ghost">← Dashboard</Link>
          </div>
        </header>
        <main style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, color: 'var(--gold)', marginBottom: 20 }}>⊞</div>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 700,
            color: 'var(--text-1)', marginBottom: 12,
          }}>BizBooks</h1>
          <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
            Simple money tracking for your business. No accounting degree needed.
            Know your profit, your biggest expenses, and whether your business is
            actually making money — in plain Nigerian English.
          </p>
          <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
            Get BizBooks — ₦9,000/yr →
          </a>
          <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-3)' }}>
            After purchase, activate your key on the dashboard.
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>

      {/* Header */}
      <header className="dash-header">
        <div className="dash-logo">
          <span className="dash-logo-mark">⊞</span>
          <span className="dash-logo-name">BizBooks</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 1, justifyContent: 'center' }}>
          {(['overview', 'add', 'history'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '8px 18px',
                background: tab === t ? 'var(--gold)' : 'transparent',
                border: `1px solid ${tab === t ? 'var(--gold)' : 'var(--border-hi)'}`,
                borderRadius: 20,
                color: tab === t ? '#000' : 'var(--text-2)',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {t === 'overview' ? 'Overview' : t === 'add' ? '+ Add entry' : 'All entries'}
            </button>
          ))}
        </div>
        <div className="dash-header-right">
          <Link href="/dashboard" className="btn btn-ghost">← Dashboard</Link>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div>
            {transactions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                <div style={{ fontSize: 40, color: 'var(--text-3)', marginBottom: 16 }}>⊞</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--text-2)', marginBottom: 10 }}>
                  No entries yet.
                </h2>
                <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 24, lineHeight: 1.7 }}>
                  Start by adding your money in and money out.<br />
                  Your profit picture will build automatically.
                </p>
                <button className="btn btn-primary" style={{ width: 'auto', display: 'inline-flex' }} onClick={() => setTab('add')}>
                  Add first entry →
                </button>
              </div>
            ) : (
              <div>
                {/* 3 summary cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                  {[
                    { label: 'Total money in', value: fmt(stats.totalIncome), color: 'var(--green)', bg: 'var(--green-bg)' },
                    { label: 'Total money out', value: fmt(stats.totalExpense), color: 'var(--red)', bg: 'var(--red-bg)' },
                    {
                      label: stats.profit >= 0 ? 'Your profit' : 'Your loss',
                      value: (stats.profit >= 0 ? '' : '-') + fmt(stats.profit),
                      color: stats.profit >= 0 ? 'var(--gold)' : 'var(--red)',
                      bg: stats.profit >= 0 ? 'var(--gold-glow)' : 'var(--red-bg)',
                      sub: `${stats.margin.toFixed(1)}% margin`,
                    },
                  ].map(card => (
                    <div key={card.label} style={{
                      background: card.bg,
                      border: `1px solid ${card.color}33`,
                      borderRadius: 'var(--r)',
                      padding: '20px 22px',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: 9,
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: 'var(--text-3)', marginBottom: 8,
                      }}>
                        {card.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-serif)', fontSize: 30,
                        fontWeight: 700, color: card.color, lineHeight: 1,
                        marginBottom: card.sub ? 6 : 0,
                      }}>
                        {card.value}
                      </div>
                      {card.sub && (
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{card.sub}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Profit margin plain English */}
                <div style={{
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r)',
                  marginBottom: 28,
                  fontSize: 14,
                  color: 'var(--text-2)',
                  lineHeight: 1.7,
                }}>
                  <strong style={{ color: 'var(--text-1)' }}>What this means: </strong>
                  {stats.totalIncome === 0
                    ? 'Add your income entries to see your profit picture.'
                    : stats.profit < 0
                    ? `For every ₦100 that enters your business, you are spending ₦${(Math.abs(stats.totalExpense / stats.totalIncome) * 100).toFixed(0)}. That means you are losing money. Find the biggest expense and cut it.`
                    : stats.margin < 10
                    ? `Your margin is ${stats.margin.toFixed(1)}%. For every ₦100 you make, only ₦${stats.margin.toFixed(0)} is actual profit. That is thin — look at your biggest expenses and see what you can reduce.`
                    : stats.margin < 30
                    ? `Your margin is ${stats.margin.toFixed(1)}%. For every ₦100 you make, ₦${stats.margin.toFixed(0)} is real profit. Decent. Keep expenses under control and look for ways to increase prices or sales.`
                    : `Your margin is ${stats.margin.toFixed(1)}%. For every ₦100 you make, ₦${stats.margin.toFixed(0)} is pure profit. This is healthy. Protect this margin as you grow.`}
                </div>

                {/* Top expenses */}
                {stats.topExpenses.length > 0 && (
                  <div style={{ marginBottom: 28 }}>
                    <div className="section-label">Where your money is going</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {stats.topExpenses.map(([cat, amount]) => {
                        const pct = stats.totalExpense > 0 ? (amount / stats.totalExpense) * 100 : 0
                        return (
                          <div key={cat} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '10px 14px',
                            background: 'var(--card)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--r-sm)',
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, color: 'var(--text-1)', marginBottom: 4 }}>{cat}</div>
                              <div style={{
                                height: 4, borderRadius: 2,
                                background: 'var(--border)',
                                overflow: 'hidden',
                              }}>
                                <div style={{
                                  height: '100%', width: `${pct}%`,
                                  background: 'var(--red)',
                                  borderRadius: 2,
                                  transition: 'width 0.6s ease',
                                }} />
                              </div>
                            </div>
                            <div style={{
                              fontFamily: 'var(--font-mono)', fontSize: 13,
                              color: 'var(--red)', flexShrink: 0,
                            }}>
                              {fmt(amount)}
                            </div>
                            <div style={{
                              fontFamily: 'var(--font-mono)', fontSize: 10,
                              color: 'var(--text-3)', flexShrink: 0, width: 36, textAlign: 'right',
                            }}>
                              {pct.toFixed(0)}%
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Recent entries */}
                <div>
                  <div className="section-label">Recent entries</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {transactions.slice(0, 8).map(tx => (
                      <div key={tx.id} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 16px',
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--r-sm)',
                      }}>
                        <span style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: tx.type === 'income' ? 'var(--green)' : 'var(--red)',
                          flexShrink: 0,
                        }} />
                        <span style={{ flex: 1, fontSize: 13, color: 'var(--text-1)' }}>
                          {tx.description || tx.category}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--text-3)', flexShrink: 0 }}>
                          {tx.date}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
                          color: tx.type === 'income' ? 'var(--green)' : 'var(--red)',
                          flexShrink: 0,
                        }}>
                          {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                  {transactions.length > 8 && (
                    <button
                      onClick={() => setTab('history')}
                      style={{
                        marginTop: 12, background: 'transparent', border: 'none',
                        color: 'var(--gold)', fontFamily: 'var(--font-mono)',
                        fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer',
                      }}
                    >
                      See all {transactions.length} entries →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ADD ENTRY ── */}
        {tab === 'add' && (
          <div style={{ maxWidth: 480 }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 700,
              color: 'var(--text-1)', marginBottom: 8,
            }}>
              Add an entry.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 28, lineHeight: 1.6 }}>
              Money came in or went out? Record it here. The more you track, the clearer your business picture.
            </p>

            {/* Type toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {(['income', 'expense'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => { setTxType(t); setForm(f => ({ ...f, category: '' })) }}
                  style={{
                    flex: 1, padding: '12px',
                    background: txType === t ? (t === 'income' ? 'var(--green-bg)' : 'var(--red-bg)') : 'transparent',
                    border: `1px solid ${txType === t ? (t === 'income' ? 'var(--green)' : 'var(--red)') : 'var(--border-hi)'}`,
                    borderRadius: 'var(--r-sm)',
                    color: txType === t ? (t === 'income' ? 'var(--green)' : 'var(--red)') : 'var(--text-2)',
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  {t === 'income' ? '↑ Money In' : '↓ Money Out'}
                </button>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              >
                <option value="">Select a category...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Amount (₦)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 15,000"
                value={form.amount}
                onChange={e => {
                  const raw = e.target.value.replace(/[^0-9.]/g, '')
                  setForm(f => ({ ...f, amount: raw }))
                }}
                inputMode="numeric"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Description <span style={{ color: 'var(--text-3)', textTransform: 'none', fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Sold 10 bags of rice"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>

            {saved && (
              <div className="sys-msg sys-ok">Entry saved. Your numbers updated.</div>
            )}

            <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
              <button
                className="btn btn-primary"
                onClick={addTransaction}
                disabled={!form.amount || !form.category}
                style={{ flex: 1 }}
              >
                Save entry →
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setTab('overview')}
                style={{ flexShrink: 0 }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── HISTORY ── */}
        {tab === 'history' && (
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 700,
              color: 'var(--text-1)', marginBottom: 24,
            }}>
              All entries.
            </h2>

            {transactions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-3)', fontSize: 14 }}>
                No entries yet. Add your first one.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {transactions.map(tx => (
                  <div key={tx.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px',
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-sm)',
                  }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                      background: tx.type === 'income' ? 'var(--green)' : 'var(--red)',
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: 'var(--text-1)' }}>
                        {tx.description || tx.category}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                        {tx.category} · {tx.date}
                      </div>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
                      color: tx.type === 'income' ? 'var(--green)' : 'var(--red)',
                      flexShrink: 0,
                    }}>
                      {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                    </span>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      style={{
                        background: 'transparent', border: 'none',
                        color: 'var(--text-3)', cursor: 'pointer',
                        fontSize: 14, padding: '4px', flexShrink: 0,
                        transition: 'color 0.2s',
                      }}
                      title="Delete this entry"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
