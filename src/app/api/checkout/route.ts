import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { services } from "@/data/services";

export async function POST(request: Request) {
  try {
    const { serviceId } = await request.json();

    const service = services.find((s) => s.id === serviceId);
    if (!service || service.price === null) {
      return NextResponse.json(
        { error: "Invalid service selected" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: service.price,
            product_data: {
              name: `Portfolium — ${service.name}`,
              description: service.description,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/thank-you`,
      cancel_url: `${request.headers.get("origin")}/#services`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
