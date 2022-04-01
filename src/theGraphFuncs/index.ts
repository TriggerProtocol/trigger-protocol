import axios from "axios";

const THE_GRAPH_ENDPOINT =
  "https://api.thegraph.com/subgraphs/name/sairajk19/trigger-subgraph";

/**
 * @returns All the portals within the Trigger Protocol
 */
export const getPortals = async (): Promise<{
  success: boolean;
  data: any;
}> => {
  const portals = await axios.post(THE_GRAPH_ENDPOINT, {
    query: `{
        triggerPortals {
        id
        dbThreadID
        appId
        createdAt  
        createBy
        totalNfts
        totalMembers
        totalVolume
        }
    }`,
  });

  if (portals.status === 200) {
    return { success: true, data: portals.data.data.triggerPortals };
  } else {
    return { success: false, data: [] };
  }
};

/**
 * @param portalId Id corresponding to the portal who's NFTs are being queried.
 * @returns A list of all the NFTs inside that specific portal.
 */
export const getPortalNFTs = async (
  portalId: string | number
): Promise<{ success: boolean; data: any }> => {
  const portalNFTs = await axios.post(THE_GRAPH_ENDPOINT, {
    query: `{
      triggerNfts(where: { portalId: ${portalId} }) {
        id
        portalId
        tokenId
        tokenUri
        currentOwner
        previousOwner
        mintedBy
        forSale
        price
      }
  }`,
  });

  if (portalNFTs.status === 200) {
    return { success: true, data: portalNFTs.data.data.triggerNfts };
  } else {
    return { success: false, data: [] };
  }
};

/**
 * @param portalId Id corresponding to the portal which the users have joined.
 * @returns A list of all the users inside that specific portal.
 */
export const getPortalUsers = async (
  portalId: string | number
): Promise<{
  success: boolean;
  data: any;
}> => {
  const users = await axios.post(THE_GRAPH_ENDPOINT, {
    query: `{
      users(where: {portal: ${portalId}}) {
        id
        userAddr
        portal
      }
    }
  `,
  });

  if (users.status === 200) {
    return { success: true, data: users.data.data.users };
  } else {
    return { success: false, data: [] };
  }
};

/**
 * @param portalId Id of the portal who's stakes are to be queried.
 * @returns A list of all the stakes inside a particular portal.
 */
export const getAllStakesInPortal = async (
  portalId: string | number
): Promise<{ success: boolean; data: any }> => {
  const stakes = await axios.post(THE_GRAPH_ENDPOINT, {
    query: `{
      stakes(where: { portalId: ${portalId} }) {
        id
        portalId
        amount
        timestamp
        staker
      }
    }
  `,
  });

  if (stakes.status === 200) {
    return { success: true, data: stakes.data.data.stakes };
  } else {
    return { success: false, data: [] };
  }
};

/**
 * @param portalId Id of the portal who's stakes are to be queried.
 * @param staker staker who's stakes are to be queried.
 * @returns A list of all the stakes by a particular staker inside the requested portal.
 */
export const getSingleUserStakes = async (
  portalId: string | number,
  staker: string
): Promise<{ success: boolean; data: any }> => {
  const stakes = await axios.post(THE_GRAPH_ENDPOINT, {
    query: `{
      stakes(where: { portalId: ${portalId}, staker: "${staker}" }) {
        id
        portalId
        amount
        timestamp
        staker
      }
    }
  `,
  });

  if (stakes.status === 200) {
    return { success: true, data: stakes.data.data.stakes };
  } else {
    return { success: false, data: [] };
  }
};
