import { Card } from 'antd'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function AboutUs() {
  const [value, setValue] = useState('');
  return (
    <>
  
    <section className="text-white bg-gray-900">
  <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold sm:text-4xl text-white ">Ethiopian Seed Association</h2>

      <p className="mt-4 text-gray-300">
      The Ethiopian Seed Association (ESA) which was used to be named Ethiopian Seed Growers and Processors Association (ESGPA A) was renamed in 2014 to fit to the current seed development status of the country and to involve all relevant seed sector actor including national and international companies to join hands in the sustainable supply of quality seed to small farms. ESA is a young association that was officially formed in 2006 under the Ethiopian seed proclamation No. 206/2000 by individuals engaged in public and private seed production, distribution, and trade. The Association was reorganized with more members and clear objectives as seed trade association in the 2008 with the technical support of African Seed Trade Association. The numbers of members have increased from 8 to 29 of 2015. The by law was revised following the seed law and regulation of the country proclamation 782/2013. The association was formed to support the interest of its members in the production and supply of high quality seed to small farmers in collaboration with different national and international bodies. The association was formed to support the interest of its members in the production and supply of high quality seed to small farmers in collaboration with different national and international bodies. It serve as a forum for the stakeholders to exchange information and discuss pertinent seed issues in the development of vibrant seed sector in the country. This will subsequently contribute to the availability of quality seed at affordable price in the country. The Association is a registered member of African Seed Trade Association (AFSTA).
      </p>
    </div>
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold sm:text-4xl text-white ">ESA Stakeholders</h2>

      <p className="mt-4 text-gray-300">
      ESA has established strong working relationships with Federal and Regional State and Research Institutions, The Royal Netherlands Embassy in Ethiopia, Wagningen University and Research, SeedNL, Plantum, Ethiopia Netherlands Seed Partnership, Reselience, FAO Ethiopia and NGOs in the country. Moreover, the association has a good partnership with the African Seed Trade Association (AFSTA), Association for Strengthening Agricultural Research in Eastern and Southern Africa (ASARECA), CIMMYT and ICARDA.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <a
        className="block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"
        href="/services/digital-campaigns"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h3 className="mt-4 text-xl font-bold text-white">Digital campaigns</h3>

        <p className="mt-1 text-sm text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo
          possimus adipisci distinctio alias voluptatum blanditiis laudantium.
        </p>
      </a>

      <a
        className="block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"
        href="/services/digital-campaigns"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h3 className="mt-4 text-xl font-bold text-white">Digital campaigns</h3>

        <p className="mt-1 text-sm text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo
          possimus adipisci distinctio alias voluptatum blanditiis laudantium.
        </p>
      </a>

      <a
        className="block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"
        href="/services/digital-campaigns"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h3 className="mt-4 text-xl font-bold text-white">Digital campaigns</h3>

        <p className="mt-1 text-sm text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo
          possimus adipisci distinctio alias voluptatum blanditiis laudantium.
        </p>
      </a>

      <a
        className="block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"
        href="/services/digital-campaigns"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h3 className="mt-4 text-xl font-bold text-white">Digital campaigns</h3>

        <p className="mt-1 text-sm text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo
          possimus adipisci distinctio alias voluptatum blanditiis laudantium.
        </p>
      </a>

      <a
        className="block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"
        href="/services/digital-campaigns"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h3 className="mt-4 text-xl font-bold text-white">Digital campaigns</h3>

        <p className="mt-1 text-sm text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo
          possimus adipisci distinctio alias voluptatum blanditiis laudantium.
        </p>
      </a>

      <a
        className="block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"
        href="/services/digital-campaigns"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h3 className="mt-4 text-xl font-bold text-white">Digital campaigns</h3>

        <p className="mt-1 text-sm text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo
          possimus adipisci distinctio alias voluptatum blanditiis laudantium.
        </p>
      </a>
    </div>

    <div className="mt-12 text-center">
      <a
        className="inline-flex items-center px-8 py-3 mt-8 text-white bg-pink-600 border border-pink-600 rounded hover:bg-transparent active:text-pink-500 focus:outline-none focus:ring"
        href="/get-started"
      >
        <span className="text-sm font-medium"> Get Started </span>

        <svg
          className="w-5 h-5 ml-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  </div>
</section>

   
<ReactQuill theme="snow" value={value} onChange={setValue} />
      </>
  )
}

export default AboutUs