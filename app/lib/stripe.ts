
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config({ path: ".env.local" });

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY is missing from .env.local");
}

export const stripe = new Stripe(secretKey, {
  apiVersion: "2025-03-31.basil",
});

export const createProduct = async (
  name: string,
  description: string,
  images: string[],
  price: number,
  tripId: string
) => {
  const product = await stripe.products.create({
    name,
    description,
    images,
  });

  const priceObject = await stripe.prices.create({
    product: product.id,
    unit_amount: Math.round(price * 100),
    currency: "usd",
  });

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: priceObject.id,
        quantity: 1,
      },
    ],
    metadata: {
      tripId,
    },
    after_completion: {
      type: "redirect",
      redirect: {
        url: `${process.env.VITE_BASE_URL}/travel/${tripId}`,
      },
    },
  });

  return paymentLink;
};
