import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  data: {
    type: "object",
    properties: {
      dataset: {
        type: "object",
        properties: {
          created_at: {
            type: "string",
          },
          is_public: {
            type: "integer",
          },
          license: {
            type: "string",
          },
          name: {
            type: "string",
          },
          status: {
            type: "string",
          },
          updated_at: {
            type: "string",
          },
        },
        required: [
          "created_at",
          "is_public",
          "license",
          "name",
          "status",
          "updated_at",
        ],
      },
      files: {
        type: "array",
        items: [
          {
            type: "object",
            properties: {
              cid: {
                type: "string",
              },
              created_at: {
                type: "string",
              },
              name: {
                type: "string",
              },
              updated_at: {
                type: "string",
              },
              url: {
                type: "string",
              },
            },
            required: ["cid", "created_at", "name", "updated_at", "url"],
          },
        ],
      },
      message: {
        type: "string",
      },
      nft: {
        type: "object",
        properties: {
          contract_address: {
            type: "string",
          },
          status: {
            type: "string",
          },
          tokens: {
            type: "array",
            items: [
              {
                type: "object",
                properties: {
                  chain_id: {
                    type: "integer",
                  },
                  created_at: {
                    type: "string",
                  },
                  reference_id: {
                    type: "integer",
                  },
                  source_type: {
                    type: "string",
                  },
                  token_id: {
                    type: "integer",
                  },
                  transaction_hash: {
                    type: "string",
                  },
                  updated_at: {
                    type: "string",
                  },
                },
                required: [
                  "chain_id",
                  "created_at",
                  "reference_id",
                  "source_type",
                  "token_id",
                  "transaction_hash",
                  "updated_at",
                ],
              },
            ],
          },
        },
        required: ["contract_address", "status", "tokens"],
      },
    },
    required: ["dataset", "files", "message", "nft"],
  },
  status: {
    type: "string",
  },

  required: ["data", "status"],
});

export default mongoose.model("Data", dataSchema);
