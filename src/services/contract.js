// http://localhost:9002/hr/contracts

import axios from "axios";

const apiContract = "http://localhost:9002/hr/contracts";

export const fetchContracts = async (pageNo, pageSize) => {
  try {
    const response = await axios.get(apiContract, {
      params: {
        page: pageNo,
        size: pageSize,
      },
    });
    console.log("Data tu be: ", response.data);
    if (response.data && response.data.data) {
      const contracts = response.data.data.content;

      const sortedContracts = Array.isArray(contracts)
        ? contracts.sort((a, b) => {
            if (b.status === a.status) {
              return new Date(b.updateAt) - new Date(a.updateAt);
            }
            return b.status - a.status;
          })
        : [];

      return {
        content: sortedContracts,
        totalPages: response.data.data.totalPages,
        currentPage: response.data.data.number + 1,
      };
    } else {
      throw new Error("Dữ liệu không hợp lệ từ server");
    }
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy dữ liệu hợp đồng!", error);
    throw error;
  }
};
