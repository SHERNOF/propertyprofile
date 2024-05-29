const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// async function fetchProperties() {
  // for  <FeaturedProperties />
  async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // handle the domain if not yet available
    if (!apiDomain) {
      return [];
    }
    // const res = await fetch(`${apiDomain}/properties`, { cache: 'no-store' });
    // if (!res.ok) {
    //   throw new Error("Failed to fetch data");
    // }
    
    // for  <FeaturedProperties />
    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? '/featured' : ''}`,
      { cache: 'no-store' }
    );
console.log(res)
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchProperty(id) {
  try {
    // handle the domain if not yet available
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
export { fetchProperties, fetchProperty };
