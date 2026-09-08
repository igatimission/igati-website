import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BriefcaseBusiness,
  Handshake,
  Lightbulb,
  LoaderCircle,
  MapPin,
  Package,
  Search,
  ShoppingBag,
  Store,
  Users,
  Wrench,
} from "lucide-react";

import { marketplaceApi } from "../api/marketplaceApi";
import { getAccessToken } from "../api/api";


const MarketplacePage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    categories: [],
    listings: [],
    needs: [],
    offers: [],
  });

  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    loadMarketplace();
  }, []);


  const loadMarketplace = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await marketplaceApi.home();

      setData({
        categories: response.categories || [],
        listings: response.listings || [],
        needs: response.needs || [],
        offers: response.offers || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      setSearching(true);
      setError("");

      const response = await marketplaceApi.search(
        query.trim()
      );

      setSearchResults(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setSearching(false);
    }
  };


  const requireLogin = (destination) => {
    if (!getAccessToken()) {
      navigate("/login", {
        state: {
          from: {
            pathname: destination,
          },
        },
      });

      return;
    }

    navigate(destination);
  };


  return (
    <div className="min-h-screen bg-[#F8FAF7]">

      {/* =====================================================
          MARKETPLACE HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C] text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#6C994E]/15" />
        <div className="absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-[#F2B632]/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">

          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-[#F2B632]">
              Marketplace & Value Exchange Centre
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              What are you looking for?
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Find products, services, people, enterprises,
              projects and opportunities across the IGATI
              ecosystem.
            </p>


            {/* SEARCH */}

            <form
              onSubmit={handleSearch}
              className="mx-auto mt-9 flex max-w-3xl overflow-hidden rounded-2xl bg-white p-2 shadow-2xl shadow-black/20"
            >
              <div className="relative flex-1">
                <Search
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);

                    if (!e.target.value.trim()) {
                      setSearchResults(null);
                    }
                  }}
                  placeholder="Search products, services, people, projects..."
                  className="w-full bg-transparent py-4 pl-12 pr-4 text-[#16313B] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={searching}
                className="hidden items-center gap-2 rounded-xl bg-[#F2B632] px-7 font-bold text-[#073B4C] transition hover:bg-[#D99A16] disabled:opacity-60 sm:flex"
              >
                {searching ? (
                  <LoaderCircle
                    size={19}
                    className="animate-spin"
                  />
                ) : (
                  <Search size={19} />
                )}

                Search
              </button>
            </form>


            {/* SEARCH TYPES */}

            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/65">
              <span>Products</span>
              <span>•</span>
              <span>Services</span>
              <span>•</span>
              <span>People</span>
              <span>•</span>
              <span>Enterprises</span>
              <span>•</span>
              <span>Projects</span>
              <span>•</span>
              <span>Opportunities</span>
            </div>
          </div>


          {/* ACTIONS */}

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

            <ActionButton
              icon={ShoppingBag}
              label="Buy"
              onClick={() =>
                document
                  .getElementById("listings")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            />

            <ActionButton
              icon={Store}
              label="Sell"
              onClick={() =>
                requireLogin("/marketplace/sell")
              }
            />

            <ActionButton
              icon={Lightbulb}
              label="Post a Need"
              onClick={() =>
                requireLogin("/marketplace/post-need")
              }
            />

            <ActionButton
              icon={Wrench}
              label="Offer Value"
              onClick={() =>
                requireLogin("/marketplace/offer-value")
              }
            />

            <ActionButton
              icon={Handshake}
              label="Collaborate"
              onClick={() =>
                requireLogin("/marketplace/connections")
              }
            />

          </div>
        </div>
      </section>


      {/* ERROR */}

      {error && (
        <div className="mx-auto max-w-7xl px-5 pt-8">
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            {error}
          </div>
        </div>
      )}


      {/* SEARCH RESULTS */}

      {searchResults && (
        <SearchResults
          data={searchResults}
          query={query}
        />
      )}


      {/* NORMAL MARKETPLACE CONTENT */}

      {!searchResults && (
        <>
          {/* CATEGORIES */}

          <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Explore the marketplace"
              title="Find value across the ecosystem"
              description="Discover the resources, skills and opportunities available across IGATI."
            />

            {loading ? (
              <Loading />
            ) : (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {data.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={async () => {
                      setQuery(category.name);

                      try {
                        setSearching(true);

                        const result =
                          await marketplaceApi.search(
                            category.name
                          );

                        setSearchResults(result);
                      } finally {
                        setSearching(false);
                      }
                    }}
                    className="group rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#6C994E]/30 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E]">
                      <Package size={21} />
                    </div>

                    <h3 className="mt-5 font-bold text-[#073B4C]">
                      {category.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                      {category.description ||
                        "Explore opportunities in this category."}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#6C994E]">
                      Explore
                      <ArrowRight size={15} />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>


          {/* LISTINGS */}

          <section
            id="listings"
            className="border-y border-gray-100 bg-white"
          >
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

              <SectionHeading
                eyebrow="Marketplace"
                title="Products & services"
                description="Explore active products, services and resources from members of the IGATI ecosystem."
              />

              {loading ? (
                <Loading />
              ) : data.listings.length ? (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {data.listings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  text="No marketplace listings have been posted yet."
                />
              )}

            </div>
          </section>


          {/* NEEDS */}

          <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Post a Need"
                title="What does the ecosystem need?"
                description="Discover needs posted by members, enterprises and projects."
              />

              <button
                onClick={() =>
                  requireLogin("/marketplace/post-need")
                }
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-5 py-3 text-sm font-bold text-white"
              >
                Post a Need
                <ArrowRight size={16} />
              </button>
            </div>


            {loading ? (
              <Loading />
            ) : data.needs.length ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {data.needs.map((need) => (
                  <NeedCard
                    key={need.id}
                    need={need}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                text="No needs have been posted yet."
              />
            )}

          </section>


          {/* VALUE OFFERS */}

          <section className="bg-[#073B4C]">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#F2B632]">
                    Offer Value
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-white">
                    What can our ecosystem offer?
                  </h2>

                  <p className="mt-3 max-w-2xl text-white/65">
                    Skills, equipment, knowledge, mentorship,
                    services, partnerships and other forms of
                    value.
                  </p>
                </div>

                <button
                  onClick={() =>
                    requireLogin("/marketplace/offer-value")
                  }
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-5 py-3 text-sm font-bold text-[#073B4C]"
                >
                  Offer Value
                  <ArrowRight size={16} />
                </button>
              </div>


              {loading ? (
                <Loading light />
              ) : data.offers.length ? (
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {data.offers.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
                  No value offers have been posted yet.
                </div>
              )}

            </div>
          </section>
        </>
      )}

    </div>
  );
};


/* ============================================================
   COMPONENTS
============================================================ */

const ActionButton = ({
  icon: Icon,
  label,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="group flex min-h-24 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#073B4C]"
  >
    <Icon
      size={23}
      className="text-[#F2B632] group-hover:text-[#6C994E]"
    />

    {label}
  </button>
);


const SectionHeading = ({
  eyebrow,
  title,
  description,
}) => (
  <div>
    <p className="text-sm font-bold uppercase tracking-widest text-[#6C994E]">
      {eyebrow}
    </p>

    <h2 className="mt-2 text-3xl font-bold text-[#073B4C]">
      {title}
    </h2>

    {description && (
      <p className="mt-3 max-w-2xl leading-7 text-gray-600">
        {description}
      </p>
    )}
  </div>
);


const ListingCard = ({ listing }) => (
  <Link
    to={`/marketplace/${listing.slug}`}
    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <div className="aspect-[4/3] bg-[#F0F4ED]">
      {listing.image ? (
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-[#6C994E]">
          <Package size={42} />
        </div>
      )}
    </div>

    <div className="p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#6C994E]/10 px-3 py-1 text-xs font-bold text-[#6C994E]">
          {listing.listing_type_display ||
            listing.listing_type}
        </span>

        {listing.is_verified && (
          <span className="text-xs font-semibold text-[#07505E]">
            ✓ Verified
          </span>
        )}
      </div>

      <h3 className="mt-4 line-clamp-2 font-bold text-[#073B4C]">
        {listing.title}
      </h3>

      {listing.location && (
        <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin size={15} />
          {listing.location.name}
        </div>
      )}

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          {listing.price ? (
            <>
              <p className="text-xs text-gray-400">
                {listing.price_negotiable
                  ? "Negotiable"
                  : "Price"}
              </p>

              <p className="font-bold text-[#073B4C]">
                {listing.currency}{" "}
                {Number(listing.price).toLocaleString()}
              </p>
            </>
          ) : (
            <p className="font-semibold text-[#6C994E]">
              Contact for details
            </p>
          )}
        </div>

        <ArrowRight
          size={18}
          className="text-[#6C994E] transition group-hover:translate-x-1"
        />
      </div>
    </div>
  </Link>
);


const NeedCard = ({ need }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2B632]/15 text-[#D99A16]">
        <Lightbulb size={21} />
      </div>

      <span className="rounded-full bg-[#F2B632]/10 px-3 py-1 text-xs font-bold text-[#D99A16]">
        {need.need_type_display || need.need_type}
      </span>
    </div>

    <h3 className="mt-5 text-lg font-bold text-[#073B4C]">
      {need.title}
    </h3>

    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
      {need.description}
    </p>

    <div className="mt-5 border-t border-gray-100 pt-4">
      <p className="text-sm font-semibold text-[#16313B]">
        {need.owner?.full_name}
      </p>

      {need.location && (
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={13} />
          {need.location.name}
        </p>
      )}
    </div>
  </div>
);


const OfferCard = ({ offer }) => (
  <div className="rounded-2xl border border-white/10 bg-white/10 p-6 text-white">
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9BC36B]/15 text-[#9BC36B]">
      <Handshake size={21} />
    </div>

    <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#F2B632]">
      {offer.offer_type_display || offer.offer_type}
    </p>

    <h3 className="mt-2 text-lg font-bold">
      {offer.title}
    </h3>

    <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/65">
      {offer.description}
    </p>

    <div className="mt-5 border-t border-white/10 pt-4">
      <p className="text-sm font-semibold">
        {offer.owner?.full_name}
      </p>

      {offer.location && (
        <p className="mt-1 flex items-center gap-1 text-xs text-white/50">
          <MapPin size={13} />
          {offer.location.name}
        </p>
      )}
    </div>
  </div>
);


const SearchResults = ({ data, query }) => {
  const total =
    (data.listings?.length || 0) +
    (data.people?.length || 0) +
    (data.enterprises?.length || 0) +
    (data.projects?.length || 0) +
    (data.opportunities?.length || 0) +
    (data.needs?.length || 0) +
    (data.offers?.length || 0);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-[#6C994E]">
        {total} result{total !== 1 ? "s" : ""} found
      </p>

      <h2 className="mt-2 text-3xl font-bold text-[#073B4C]">
        Results for “{query}”
      </h2>

      {total === 0 && (
        <EmptyState text="We couldn't find anything matching your search." />
      )}


      {!!data.listings?.length && (
        <ResultSection
          title="Products & Services"
          icon={ShoppingBag}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
              />
            ))}
          </div>
        </ResultSection>
      )}


      {!!data.people?.length && (
        <ResultSection
          title="People"
          icon={Users}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.people.map((person) => (
              <Link
                key={person.id}
                to={`/people/${person.slug}`}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <p className="font-bold text-[#073B4C]">
                  {person.full_name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {person.person_type_display}
                </p>
              </Link>
            ))}
          </div>
        </ResultSection>
      )}


      {!!data.enterprises?.length && (
        <ResultSection
          title="Enterprises"
          icon={Store}
        >
          <SimpleResults
            items={data.enterprises}
            getTitle={(item) => item.name}
          />
        </ResultSection>
      )}


      {!!data.projects?.length && (
        <ResultSection
          title="Projects"
          icon={BriefcaseBusiness}
        >
          <SimpleResults
            items={data.projects}
            getTitle={(item) => item.title}
          />
        </ResultSection>
      )}


      {!!data.opportunities?.length && (
        <ResultSection
          title="Opportunities"
          icon={Lightbulb}
        >
          <SimpleResults
            items={data.opportunities}
            getTitle={(item) => item.title}
          />
        </ResultSection>
      )}
    </section>
  );
};


const ResultSection = ({
  title,
  icon: Icon,
  children,
}) => (
  <div className="mt-10">
    <div className="mb-5 flex items-center gap-2">
      <Icon
        size={20}
        className="text-[#6C994E]"
      />

      <h3 className="text-xl font-bold text-[#073B4C]">
        {title}
      </h3>
    </div>

    {children}
  </div>
);


const SimpleResults = ({
  items,
  getTitle,
}) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => (
      <div
        key={item.id}
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
      >
        <p className="font-bold text-[#073B4C]">
          {getTitle(item)}
        </p>

        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#6C994E]">
          View details
          <ArrowRight size={15} />
        </div>
      </div>
    ))}
  </div>
);


const Loading = ({ light = false }) => (
  <div
    className={`flex items-center justify-center gap-3 py-16 ${
      light ? "text-white/60" : "text-gray-500"
    }`}
  >
    <LoaderCircle
      size={24}
      className="animate-spin"
    />

    Loading marketplace...
  </div>
);


const EmptyState = ({ text }) => (
  <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
    {text}
  </div>
);


export default MarketplacePage;