import { GetServerSideProps, NextPage } from "next"
import Stripe from 'stripe'
import Card from "../components/Card";
import Header from "../components/Header";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2022-11-15'
  });

  const products = await stripe.prices.list({
    limit: 10,
    expand: ['data.product']
  });

  const prices = products.data.filter(price => price.active);

  return {
    props: {
      prices
    }
  }
}

interface HomeProps {
  prices: Stripe.Price[]
}

const Home: NextPage<HomeProps> = ({ prices }) => {
  return (
    <main className='bg-gray-100 min-h-screen'>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mt-8 sm:mt-8 flex flex-wrap gap-y-4 sm:gap-y-0 gap-x-0 sm:gap-x-0">
          {
            prices.map(p => (
              <Card price={p} key={p.id} />
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default Home;

