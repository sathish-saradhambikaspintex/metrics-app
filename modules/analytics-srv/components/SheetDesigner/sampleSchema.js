export const sampleData = [
	{
		"ENTRY DATE": "30-12-2017",
		"40S FHPR STOCK": 8234,
		"30S FHPR STOCK": 1021.81,
		"40S KHY STOCK": 12096,
		"34S KHY STOCK": null,
		"30S KHY STOCK": 7982,
		MACHINE: "CARD05",
		"CARDING DATA": 33.18,
	},
	{
		"ENTRY DATE": "19-12-2017",
		"40S FHPR STOCK": 8620.4,
		"30S FHPR STOCK": 4419.68,
		"40S KHY STOCK": 20060,
		"34S KHY STOCK": 2452,
		"30S KHY STOCK": 3580,
		MACHINE: "CARD05",
		"CARDING DATA": 28.37,
	},
	{
		"ENTRY DATE": "11-12-2017",
		"40S FHPR STOCK": 10405.2,
		"30S FHPR STOCK": 7179.68,
		"40S KHY STOCK": 22024,
		"34S KHY STOCK": 2452,
		"30S KHY STOCK": 1874,
		MACHINE: "CARD05",
		"CARDING DATA": 28.35,
	},
];
export const sampleSchema = [
	{
		displayName: "ENTRY DATE",
		fieldName: "entry_date",
		fieldProps: {
			required: true,
			showInTableView: true,
		},
		fieldType: "date",
	},
	{
		displayName: "40S FHPR STOCK",
		fieldName: "40_s_fhpr_stock",
		fieldType: "decimal",
	},
	{
		displayName: "30S FHPR STOCK",
		fieldName: "30_s_fhpr_stock",
		fieldType: "decimal",
	},
	{
		displayName: "40S KHY STOCK",
		fieldName: "40_s_khy_stock",
		fieldType: "decimal",
	},
	{
		displayName: "34S KHY STOCK",
		fieldName: "34_s_khy_stock",
		fieldType: "decimal",
	},
	{
		displayName: "30S KHY STOCK",
		fieldName: "30_s_khy_stock",
		fieldType: "decimal",
	},
	{
		displayName: "FIN",
		fieldName: "fin",
		fieldType: "array",
		fieldProps: {
			valueType: "number",
		},
	},
	{
		displayName: "IIN",
		fieldName: "iin",
		fieldType: "array",
		fieldProps: {
			valueType: "number",
		},
	},
];
