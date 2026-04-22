'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'

// ── TYPES ─────────────────────────────────────────────────────
interface Term {
  id: number
  term: string
  slug: string
  category: string
  simple: string
  story: string
  reality: string
  isFree?: boolean
}

// ── ALL 25 SEED TERMS (from your existing content) ────────────
// The full 500 will be loaded from Supabase once populated.
// For now this is the built-in set that always works offline.
const SEED_TERMS: Term[] = [
  {
    id: 1, term: 'Dividend', slug: 'dividend', category: 'Income',
    isFree: true,
    simple: 'A share of a company\'s profits paid directly to you, the owner.',
    story: 'Imagine you bought shares in Zenith Bank. You are now a part-owner, even if you only have ₦10k inside. At the end of the year, the CEO and the board sit down and say: "We made ₦500 Billion profit. Let\'s give our owners small Thank You money." Suddenly, you get a credit alert of ₦5,000 on your phone while you are eating Suya. You didn\'t work for it, you didn\'t trek to the bank. They just sent your share of the national cake because you dropped money for them to work with.',
    reality: 'Dividends are the test of a real company. A company can lie about its profit on Instagram, but it cannot lie about the cash it sends to your bank. Always look for dividend-paying stocks if you want a soft life in your old age. If they aren\'t paying dividends, they better be growing like a forest.',
  },
  {
    id: 2, term: 'EBITDA', slug: 'ebitda', category: 'Accounting',
    isFree: true,
    simple: 'Earnings Before Interest, Taxes, Depreciation, and Amortisation — the "loud" profit number before life and government take their cut.',
    story: 'A businessman in Aba tells you: "My factory makes ₦100 million profit a year!" You are impressed and ready to bow. But wait — he hasn\'t paid the interest on the bank loan he took for machines, the Government Tax (FIRS), or the maintenance of his broken delivery trucks. That ₦100 million is his EBITDA. It is the loud, raw money entering the shop before Life and Government start chopping it.',
    reality: 'Companies love to shout their EBITDA in Annual Reports because it\'s always a big, sexy number. But as an investor, only care about net profit — the money that actually remains in the owner\'s hand after everyone has been paid. Don\'t eat the loud money; eat the real money.',
  },
  {
    id: 3, term: 'ROIC', slug: 'roic', category: 'Analysis',
    isFree: true,
    simple: 'Return on Invested Capital — how much profit a company squeezes out of every naira it uses to run the business.',
    story: 'Imagine two neighbours. Brother A takes ₦10 million and builds a bakery that brings ₦1 million profit a year. Brother B takes only ₦2 million and builds a popcorn stand that also brings ₦1 million profit a year. Brother B is a wizard! His ROIC is much higher because he used small money to generate big results. He is better at managing capital.',
    reality: 'High ROIC is the secret sauce of companies like Apple or MTN. They don\'t need to borrow billions to make billions. If a company has a low ROIC, it means they are wasting money or just busy doing nothing. Invest in the wizards, not the wasters.',
  },
  {
    id: 4, term: 'Inflation', slug: 'inflation', category: 'Economics',
    isFree: true,
    simple: 'The speed at which prices rise — or the rate at which your money\'s buying power quietly shrinks.',
    story: 'In 2015, your ₦500 was a bodybuilder — it could carry a full plate of Jollof with 2 meats and cold Malt. Today, the same ₦500 note has shrunk — it is now a lanky boy who can only carry one sachet of pure water and 2 Tom-Tom. The paper is the same colour, but the spirit of the money has traveled. Inflation is the ghost that enters your bank account and deletes the value of your money without your permission.',
    reality: 'Saving Naira is a losing game. If you keep ₦1 million under your bed for 10 years, by the time you bring it out, it might only be able to buy one bag of rice. You must invest in things that grow faster than the price of rice and petrol — otherwise you are getting poorer every day while saving.',
  },
  {
    id: 5, term: 'Liquidity', slug: 'liquidity', category: 'Risk',
    isFree: true,
    simple: 'How quickly you can turn an investment into cash when you actually need the money.',
    story: 'A woman stores her savings by buying half a plot of land in a remote bush. One night her son wakes up terribly sick and she needs ₦50k for the hospital right now. Will she wake Oloriebi at 2am to look for a buyer? Or pack sand from the land and use it to pay the doctor while her child suffers? That land is illiquid. But if she had kept that ₦50k under her bed, she would just grab it and run. That cash is liquid.',
    reality: 'You cannot eat a C-of-O for dinner. Never be a millionaire on paper who is begging for ₦2k to buy fuel. Always have a liquid reserve — savings app, T-Bills — that you can reach in 5 minutes when life happens. Check the liquidity of any stock before you invest.',
  },
  {
    id: 6, term: 'P/E Ratio', slug: 'pe-ratio', category: 'Valuation',
    isFree: false,
    simple: 'How many years of current profit you are paying for when you buy a share at today\'s price.',
    story: 'You want to buy a commercial Danfo bus. The bus costs ₦5 million. The driver brings you ₦1 million profit every year. It will take you 5 years to recover your original money — your P/E is 5. If the bus was selling for ₦20 million, your P/E would be 20. You\'d be waiting 20 years just to break even.',
    reality: 'If a stock has a P/E of 100, you are essentially saying you are ready to wait 100 years to get your money back. Unless that company is the next Amazon, you are overpaying because of hype. Wise investors look for low P/E stocks that are money machines, not fashion statements.',
  },
  {
    id: 7, term: 'Compounding', slug: 'compounding', category: 'Strategy',
    isFree: false,
    simple: 'When your investment returns start generating their own returns — your money having children, and those children having grandchildren.',
    story: 'You have one male and one female goat. They give birth to 2 kids. Now you have 4 goats. Instead of killing the kids for pepper-soup to flex, you let them grow. Next year, the 4 goats give birth to 4 more. Before you know it, your backyard is full of 50 goats from just 2 original goats. Your money has started giving birth to children and grandchildren.',
    reality: 'Compound interest is the 8th Wonder of the World. It starts slow like a snail, but it ends fast like a rocket. The secret is TIME. Don\'t interrupt the process by withdrawing your profit to buy lace or drinks every year. Let the goats multiply.',
  },
  {
    id: 8, term: 'Sapa', slug: 'sapa', category: 'Fundamentals',
    isFree: true,
    simple: 'The state of being extremely broke — when your assets are zero but your lifestyle stayed high.',
    story: 'This is the villain of our story. Sapa is why your account is showing ₦0.05 and your landlord is suddenly speaking ancient Hebrew to you. Sapa is the darkness that comes when you have no assets and high lifestyle. This dictionary is the light we are using to chase Sapa out of your house.',
    reality: 'Sapa is a choice in the long run. If you don\'t learn how to make your money work, you will work for money until your hair turns white. Knowledge is the only Sapa-proof vest you can wear.',
  },
  {
    id: 9, term: 'Bull Market', slug: 'bull-market', category: 'Markets',
    isFree: false,
    simple: 'When share prices are rising and almost everyone is making money — the good season.',
    story: 'This is Detty December in the stock market. Everyone is smiling, your portfolio is green like a forest, and you start thinking you are a trading prophet. Even your barber is telling you which crypto to buy. Money is flowing, people are buying champagne, and nobody believes prices will ever fall again.',
    reality: 'In a bull market, everyone is a genius. The problem is that people become greedy and careless. They start borrowing money to buy shitcoins. But remember: the bull eventually gets tired. If you don\'t take profit while the music is loud, you will be the one washing the plates when the lights come on.',
  },
  {
    id: 10, term: 'Bear Market', slug: 'bear-market', category: 'Markets',
    isFree: false,
    simple: 'When share prices fall 20% or more and the bad season arrives — January Sapa for the whole market.',
    story: 'Imagine you wake up and the party has ended. The IJGBs have flown back to London, and all you see on the floor are broken bottles. Your ₦1 million portfolio is now worth ₦200k. Everyone is crying on Twitter. The experts have deleted their accounts. This is the Bear. He has come to swipe his claws and take all the awoof money back.',
    reality: 'Wealth is made in the Bear Market, but shown in the Bull Market. While everyone is running away, the Odogwus are the ones quietly buying good stocks at gutter prices. If you can survive the Bear without selling your future, you will be the King next year.',
  },
  {
    id: 11, term: 'Volatility', slug: 'volatility', category: 'Risk',
    isFree: false,
    simple: 'How violently a share price jumps up and down — the shake of the investment.',
    story: 'Imagine you are inside a yellow Danfo on a Third Mainland Bridge full of potholes. One minute you are flying up to hit the roof, the next minute your bottom hits the hard iron seat. Your stomach is turning. That up and down vibration is volatility. Crypto is like that Danfo. Land is like a Rolls Royce on a smooth road — it doesn\'t shake.',
    reality: 'Volatility is NOT your enemy — panic is. If you can stay on the Danfo until you reach your destination, you will be fine. Most people jump out while the bus is moving and they break their legs — selling at a loss.',
  },
  {
    id: 12, term: 'ROI', slug: 'roi', category: 'Analysis',
    isFree: false,
    simple: 'Return on Investment — the simple math that answers: was this hustle worth my money and stress?',
    story: 'You bought a generator for ₦100k to rent out to barbers. After one month, the generator has brought you ₦150k cash. You have recovered your original ₦100k and made ₦50k jara. Your ROI is 50%. It is the simple math that answers the question: was this hustle worth my stress?',
    reality: 'Always calculate ROI after expenses. If you made ₦50k profit but spent ₦60k on mechanic to fix the generator, your ROI is -10%. You are running a charity, not a business.',
  },
  {
    id: 13, term: 'Diversification', slug: 'diversification', category: 'Strategy',
    isFree: false,
    simple: 'Spreading your money across different investments so that one bad one cannot destroy everything.',
    story: 'At a Yoruba Owambe, you don\'t just fill your plate with only Jollof Rice. You put Jollof (stocks), Moin-Moin (bonds), and two pieces of meat (real estate). If the Jollof Rice is too salty — the stock market crashes — you still have Moin-Moin and meat to fill your stomach.',
    reality: 'Don\'t put all your eggs in one polythene bag. If you put all your money in one crypto and it crashes, you are finished. Diversification is the only free lunch in the market.',
  },
  {
    id: 14, term: 'Asset', slug: 'asset', category: 'Fundamentals',
    isFree: false,
    simple: 'Anything that puts money INTO your pocket — the money-maker.',
    story: 'A grinding machine is an asset — it brings money every day. A rental shop is an asset. But that ₦1.5 million iPhone you bought just to snap loud pictures? That is a liability — because it eats your data money and loses value every day.',
    reality: 'Rich people buy assets; broke people buy liabilities they think are assets. If it doesn\'t put money inside your pocket, it\'s not an asset. It\'s a member of the family that you are feeding.',
  },
  {
    id: 15, term: 'Liability', slug: 'liability', category: 'Fundamentals',
    isFree: false,
    simple: 'Anything that takes money OUT of your pocket — the money-sucker.',
    story: 'This is the financial vacuum cleaner. Your debt to the landlord, your credit at the mama-put, and that car loan for a car that drinks ₦20k fuel every day. They are all liabilities. They suck money out of your pocket every month.',
    reality: 'The goal is to use assets to pay for liabilities. Don\'t buy a Lexus — a liability — with your salary. Buy it with the dividends from your shares. That is the Odogwu way.',
  },
  {
    id: 16, term: 'IPO', slug: 'ipo', category: 'Markets',
    isFree: false,
    simple: 'Initial Public Offering — when a private company opens its doors to the public for the first time to sell ownership.',
    story: 'Imagine a famous Amala joint that has been a family business for 50 years. Suddenly, the owner says: "I want to open 1,000 branches! Oya, everyone, come and buy ownership!" That first day he opens the door to the public is the IPO. It is the wedding day of the company.',
    reality: 'IPOs are usually over-hyped. The company will use fine packaging to make their business look like paradise. Don\'t buy an IPO on the first day — wait for 6 months for the makeup to wash away and the real face to show.',
  },
  {
    id: 17, term: 'Bond', slug: 'bond', category: 'Income',
    isFree: false,
    simple: 'A loan you give to a government or company — they pay you interest and return your money at the end.',
    story: 'The Lagos State Government wants to build a new bridge. They don\'t have enough cash. So they say: "Lend us ₦100k for 5 years. We will pay you ₦10k every year as interest, and after 5 years, we give you back your ₦100k." You are now the landlord and the Government is your tenant.',
    reality: 'Bonds are for peace of mind. They won\'t make you a billionaire in 2 days, but they will ensure you have money for bread and light bill while the stock market is vibrating.',
  },
  {
    id: 18, term: 'Net Worth', slug: 'net-worth', category: 'Personal Finance',
    isFree: false,
    simple: 'Everything you own minus everything you owe — your naked financial reality.',
    story: 'Imagine you go to a pool party. You arrived in a borrowed Lexus, wearing a designer watch you haven\'t paid for. When the bouncer — Reality — strips you naked of everything you don\'t actually own, the small singlet and ₦150 in your boxers that remain is your net worth.',
    reality: 'Looking rich is not being rich. Most people on Instagram have a negative net worth — they owe more than they own. True wealth is what stays with you after everyone you owe has been paid.',
  },
  {
    id: 19, term: 'Venture Capital', slug: 'venture-capital', category: 'Business',
    isFree: false,
    simple: 'Big money given to a startup with huge potential — in exchange for part-ownership.',
    story: 'You have a brilliant idea to make an app that translates Yoruba to Chinese. You are broke. A VC firm sees you and says: "Here is $1 million to build this!" They are betting that if you succeed, they will own 20% of a billion-dollar company.',
    reality: 'VC money is expensive freedom. The moment you collect that $1 million, the Godfather will be calling you at 3am to ask why you haven\'t made profit. You are no longer the boss — you are an employee of your own dream.',
  },
  {
    id: 20, term: 'Portfolio', slug: 'portfolio', category: 'Strategy',
    isFree: false,
    simple: 'Your total collection of all investments — the investment wardrobe.',
    story: 'This is your Ghana-Must-Go bag of wealth. Inside, you have: stocks (the fine shoes for parties), bonds (the boring slippers for house use), and land (the heavy winter coat for rainy days). That entire collection is your portfolio.',
    reality: 'A good portfolio must look like a balanced diet. If your portfolio is 100% flashy sunglasses — crypto — you will go blind when the sun gets too hot.',
  },
  {
    id: 21, term: 'Bear Trap', slug: 'bear-trap', category: 'Trading',
    isFree: false,
    simple: 'When the market fakes a crash to scare you into selling — then immediately bounces back up.',
    story: 'You are watching a wrestling match. One wrestler is forming like he has fainted. The other wrestler — the Bear — is celebrating. As he gets close to pick up the trophy, the "fainted" guy suddenly jumps up and slams the Bear to the ground! The market faked a crash just to make you sell your shares cheaply before it flies.',
    reality: 'The market is a deceiver. Sometimes it drops small just to flush out the cowards. If the reasons why you bought haven\'t changed, don\'t sell just because the price vibrated for two days.',
  },
  {
    id: 22, term: 'Dollar Cost Averaging', slug: 'dca', category: 'Strategy',
    isFree: false,
    simple: 'Investing a fixed amount of money at regular intervals — so you don\'t need to time the market perfectly.',
    story: 'You want to build a house, but you don\'t have ₦50 million. So every month when you collect salary, you buy 50 bags of cement. Some months cement is ₦5,000, some months it is ₦9,000. You don\'t care. After 3 years, you have enough materials to finish the house.',
    reality: 'DCA is the secret weapon of the working class. You don\'t need to be a market genius. You just need consistency.',
  },
  {
    id: 23, term: 'Goodwill', slug: 'goodwill', category: 'Accounting',
    isFree: false,
    simple: 'The premium paid when buying a company above what its physical assets are worth — paying for brand, loyalty, and trust.',
    story: 'GTB decides to acquire a smaller bank worth ₦50 billion on paper. But GTB pays ₦80 billion for it. Why pay extra? Because that bank has loyal customers, a trusted brand, and a talented team. The extra ₦30 billion is Goodwill — the price paid for things you cannot see but are very real.',
    reality: 'High goodwill is a risk. If the acquired business performs poorly, the company must "write down" the goodwill — admitting they overpaid. This is always bad news for shareholders.',
  },
  {
    id: 24, term: 'Share Buyback', slug: 'share-buyback', category: 'Corporate',
    isFree: false,
    simple: 'When a company uses its own cash to buy back its own shares — reducing the number of shares and giving each remaining share a bigger slice.',
    story: 'Dangote Cement has ₦100 billion in spare cash and believes their own shares are undervalued. Instead of distributing it as dividends, they go to the stock market and buy back their own shares. Those shares are cancelled. Now there are fewer shares in existence, so each remaining share you own is worth a bigger slice of the same company.',
    reality: 'Share buybacks are shareholder-friendly IF the company is buying at a genuinely low price. But if management buys at inflated prices just to make earnings-per-share look better — they are wasting your money to boost their bonuses.',
  },
  {
    id: 25, term: 'NAV', slug: 'nav', category: 'Funds',
    isFree: false,
    simple: 'Net Asset Value — the true price of one unit in a fund, calculated daily.',
    story: 'You and 10 friends contribute money to buy a giant cake — a mutual fund. You check the value of the cake, minus the money spent on the delivery man. What remains is the NAV. If you want to know how much one slice is worth, you check the NAV per unit.',
    reality: 'When buying a mutual fund, don\'t look at the fine app logo. Check the NAV. If the NAV is falling consistently, it means the cake is shrinking or the manager is eating the ingredients.',
  },
]

const CATEGORIES = [
  'All', 'Fundamentals', 'Markets', 'Analysis', 'Valuation',
  'Strategy', 'Risk', 'Income', 'Accounting', 'Economics',
  'Trading', 'Funds', 'Personal Finance', 'Business', 'Corporate',
]

// ── WORD OF THE DAY (deterministic by day number) ─────────────
function getWordOfTheDay(): Term {
  const freeTerms = SEED_TERMS.filter(t => t.isFree)
  const dayIndex = Math.floor(Date.now() / 86400000) % freeTerms.length
  return freeTerms[dayIndex]
}

// ── COMPONENT ─────────────────────────────────────────────────
export default function DictionaryClient({ hasAccess }: { hasAccess: boolean }) {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [showWOD, setShowWOD]   = useState(true)

  const wordOfTheDay = getWordOfTheDay()

  const filtered = useMemo(() => {
    const terms = hasAccess ? SEED_TERMS : SEED_TERMS.filter(t => t.isFree)
    return terms.filter(t => {
      const matchCat  = category === 'All' || t.category === category
      const matchText = !search ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.simple.toLowerCase().includes(search.toLowerCase()) ||
        t.story.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchText
    })
  }, [search, category, hasAccess])

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>

      {/* ── Header ── */}
      <header className="dash-header">
        <div className="dash-logo">
          <span className="dash-logo-mark">◱</span>
          <span className="dash-logo-name">MoneySpeak</span>
        </div>
        <div className="dash-header-right">
          <Link href="/dashboard" className="btn btn-ghost">← Dashboard</Link>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 44,
            fontWeight: 700,
            color: 'var(--text-1)',
            lineHeight: 1.1,
            marginBottom: 10,
          }}>
            Finance in Plain <span style={{ color: 'var(--gold)' }}>Nigerian English.</span>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7 }}>
            {hasAccess
              ? `${SEED_TERMS.length} terms. Every one explained with a story you will actually recognise.`
              : `${SEED_TERMS.filter(t => t.isFree).length} free terms available. Unlock all ${SEED_TERMS.length} with MoneySpeak access.`}
          </p>
        </div>

        {/* Word of the Day */}
        {showWOD && (
          <div style={{
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--r)',
            padding: '24px 28px',
            marginBottom: 36,
            position: 'relative',
          }}>
            <button
              onClick={() => setShowWOD(false)}
              style={{
                position: 'absolute', top: 14, right: 14,
                background: 'transparent', border: 'none',
                color: 'var(--text-3)', cursor: 'pointer', fontSize: 16,
              }}
            >✕</button>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 10,
            }}>
              ◈ Word of the Day — Always Free
            </div>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 30,
              fontWeight: 700, color: 'var(--text-1)',
              marginBottom: 4,
            }}>
              {wordOfTheDay.term}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--gold-dim)', letterSpacing: '0.06em',
              marginBottom: 14,
            }}>
              {wordOfTheDay.category.toUpperCase()}
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 12 }}>
              <strong style={{ color: 'var(--text-1)' }}>In plain English: </strong>
              {wordOfTheDay.simple}
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 12 }}>
              <strong style={{ color: 'var(--text-1)' }}>The story: </strong>
              {wordOfTheDay.story}
            </p>
            <p style={{
              fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7,
              padding: '10px 14px',
              background: 'rgba(0,208,132,0.06)',
              border: '1px solid rgba(0,208,132,0.15)',
              borderRadius: 6,
            }}>
              <strong style={{ color: 'var(--green)' }}>Reality check: </strong>
              {wordOfTheDay.reality}
            </p>
          </div>
        )}

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-input"
            style={{ flex: 1, minWidth: 200 }}
            placeholder="Search any term..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="form-input"
            style={{ width: 'auto', minWidth: 140 }}
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--text-3)', letterSpacing: '0.12em',
          marginBottom: 16,
        }}>
          {filtered.length} term{filtered.length !== 1 ? 's' : ''}
          {search && ` matching "${search}"`}
          {!hasAccess && (
            <span style={{ color: 'var(--amber)', marginLeft: 12 }}>
              · {SEED_TERMS.filter(t => !t.isFree).length} more terms unlocked with MoneySpeak access
            </span>
          )}
        </div>

        {/* Terms list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.length === 0 ? (
            <div style={{
              padding: '48px 24px', textAlign: 'center',
              color: 'var(--text-3)', fontSize: 14,
            }}>
              No terms found for &ldquo;{search}&rdquo;. Try a different word.
            </div>
          ) : filtered.map(term => {
            const isOpen = expanded === term.id
            return (
              <div
                key={term.id}
                style={{
                  background: isOpen ? 'var(--card-hi)' : 'var(--card)',
                  border: `1px solid ${isOpen ? 'var(--border-gold)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-sm)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                {/* Term header — always visible */}
                <button
                  onClick={() => setExpanded(isOpen ? null : term.id)}
                  style={{
                    width: '100%', padding: '16px 20px',
                    display: 'flex', alignItems: 'center',
                    gap: 12, background: 'transparent',
                    border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-serif)', fontSize: 20,
                    fontWeight: 700, color: isOpen ? 'var(--gold)' : 'var(--text-1)',
                    flex: 1, lineHeight: 1.2,
                    transition: 'color 0.2s',
                  }}>
                    {term.term}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--text-3)', flexShrink: 0,
                    padding: '3px 8px',
                    background: 'rgba(58,84,112,0.3)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                  }}>
                    {term.category}
                  </span>
                  <span style={{
                    color: 'var(--text-3)', flexShrink: 0,
                    fontSize: 14, fontFamily: 'var(--font-mono)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}>▾</span>
                </button>

                {/* Simple definition — always visible */}
                {!isOpen && (
                  <div style={{
                    padding: '0 20px 14px',
                    fontSize: 13, color: 'var(--text-2)',
                    lineHeight: 1.6,
                  }}>
                    {term.simple}
                  </div>
                )}

                {/* Full content — only when open */}
                {isOpen && (
                  <div style={{ padding: '0 20px 24px' }}>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 18 }}>
                      <strong style={{ color: 'var(--text-1)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                        In plain English
                      </strong>
                      {term.simple}
                    </p>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 18 }}>
                      <strong style={{ color: 'var(--text-1)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                        The story
                      </strong>
                      {term.story}
                    </p>
                    <div style={{
                      padding: '12px 16px',
                      background: 'rgba(0,208,132,0.05)',
                      border: '1px solid rgba(0,208,132,0.15)',
                      borderRadius: 6,
                      fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7,
                    }}>
                      <strong style={{
                        color: 'var(--green)', display: 'block',
                        fontFamily: 'var(--font-mono)', fontSize: 9,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        marginBottom: 6,
                      }}>
                        Reality check
                      </strong>
                      {term.reality}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Upsell if no access */}
        {!hasAccess && (
          <div style={{
            marginTop: 40, padding: '32px 28px',
            background: 'rgba(201,168,76,0.05)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--r)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 36, color: 'var(--gold)', marginBottom: 14 }}>◱</div>
            <h3 style={{
              fontFamily: 'var(--font-serif)', fontSize: 26,
              fontWeight: 700, color: 'var(--text-1)',
              marginBottom: 10,
            }}>
              {SEED_TERMS.filter(t => !t.isFree).length} more terms waiting.
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 24px' }}>
              Every financial term that has ever confused you — explained with stories you will actually recognise.
              No big grammar. No textbook English.
            </p>
            <a
              href={`https://selar.com/m/meridian_ng`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: 'auto', display: 'inline-flex' }}
            >
              Get MoneySpeak — ₦4,500 →
            </a>
          </div>
        )}
      </main>
    </div>
  )
}
