const t = [
	{
		title: "LIST OF MACHINES",
		name: "listOfMachines",
		userSchema: [
			{
				title: "SHORT NAME",
				name: "shortName",
				bsonType: "string",
				displayType: "text",
			},
			{
				title: "Manufacturer Name",
				name: "manufacturerName",
				bsonType: "string",
				displayType: "text",
			},
			{
				title: "Make",
				name: "make",
				bsonType: "string",
				displayType: "text",
			},
			{
				title: "Model",
				name: "model",
				bsonType: "string",
				displayType: "text",
			},
			{
				title: "Commissioning Date",
				name: "commissioningDate",
				bsonType: "date",
				displayType: "date",
			},
			{
				title: "Full Name of MC",
				name: "fullNameOfMc",
				bsonType: "string",
				displayType: "text",
			},
		],
	},
	{
		title: "LIST OF COUNTS",
		name: "listOfCounts",
		userSchema: [
			{
				title: "SHORT NAME",
				name: "shortName",
				bsonType: "string",
				displayType: "text",
			},
			{
				title: "Full Name",
				name: "fullName",
				bsonType: "string",
				displayType: "text",
			},
			{
				title: "Actual Count",
				name: "actualCount",
				bsonType: "decimal",
				displayType: "decimal",
				minimum: 30.01,
				exclusiveMinimum: true,
			},
		],
	},
	{
		title: "WEIGHING SCALE",
		name: "weighingScale",
		userSchema: [
			{
				title: "DATE AND TIME",
				name: "dateAndTime",
				bsonType: "date",
				displayType: "datetime",
			},
			{
				title: "COUNT",
				name: "count",
				bsonType: "string",
				api: "/api/list/tables/listOfCounts/shortName",
				displayType: "reference",
			},
			{
				title: "Tare Wt",
				name: "tareWt",
				bsonType: "decimal",
				displayType: "decimal",
				minimum: 0,
			},
			{
				title: "Net Wt",
				name: "netWt",
				bsonType: "decimal",
				displayType: "decimal",
				minimum: 0,
			},
			{
				title: "Gross Wt",
				name: "grossWt",
				bsonType: "decimal",
				displayType: "decimal",
				minimum: 0,
			},
			{
				title: "Bag No",
				name: "bagNo",
				bsonType: "int",
				displayType: "integer",
				minimum: 1,
			},
		],
	},
	{
		title: "LIST OF EMPLOYEES",
		name: "listOfEmployees",
		userSchema: [
			{
				title: "FULL NAME",
				name: "fullName",
				bsonType: "string",
				displayType: "text",
			},
			{
				title: "TOKEN NUMBER",
				name: "tokenNumber",
				bsonType: "string",
				displayType: "text",
			},
			{
				title: "ROLE",
				name: "role",
				bsonType: "string",
				displayType: "list",
				enum: ["CARDING", "SPINNING", "SIMPLEX", "AUTO CONER", "DRAWING", "CONE WINDING", "CLEANING", "COOK", "COPS"],
			},
		],
	},
	{
		title: "SPINNING WRP",
		name: "spinningWrp",
		userSchema: [
			{
				title: "ENTRY DATE",
				name: "entryDate",
				bsonType: "date",
				displayType: "date",
			},
			{
				title: "MACHINE",
				name: "machine",
				bsonType: "string",
				api: "/api/list/tables/listOfMachines/shortName",
				displayType: "reference",
			},
			{
				title: "WEIGHT",
				name: "weight",
				bsonType: "array",
				displayType: "array",
				uniqueItems: true,
				items: {
					bsonType: "int",
					minimum: 15,
					daad: "dasd",
				},
			},
			{
				title: "STRENGTH",
				name: "strength",
				bsonType: "array",
				displayType: "array",
				items: {
					bsonType: "decimal",
					cfsdfsd: "fdasda",
				},
			},
		],
	},
	{
		title: "R.S.B A% WRP",
		name: "rSBAWrp",
		userSchema: [
			{
				title: "ENTRY DATE",
				name: "entryDate",
				bsonType: "string",
				displayType: "date",
			},
			{
				title: "N MINUS 1",
				name: "nMinus1",
				bsonType: "array",
				displayType: "array",
			},
			{
				title: "N",
				name: "n",
				bsonType: "array",
				displayType: "array",
			},
			{
				title: "N PLUS 1",
				name: "nPlus1",
				bsonType: "array",
				displayType: "array",
			},
		],
	},
	{
		title: "DO2LS WRP",
		name: "do2lsWrp",
		userSchema: [
			{
				title: "ENTRY DATE",
				name: "entryDate",
				bsonType: "string",
				displayType: "date",
			},
			{
				title: "LHS",
				name: "lhs",
				bsonType: "array",
				displayType: "array",
			},
			{
				title: "RHS",
				name: "rhs",
				bsonType: "array",
				displayType: "array",
			},
		],
	},
	{
		title: "CARDING WRP",
		name: "cardingWrp",
		userSchema: [
			{
				title: "ENTRY DATE",
				name: "entryDate",
				bsonType: "string",
				displayType: "date",
			},
			{
				title: "MACHINE",
				name: "machine",
				bsonType: "reference",
			},
			{
				title: "CARDING DATA",
				name: "cardingData",
				bsonType: "array",
				displayType: "array",
			},
		],
	},
	{
		title: "SIMPLEX WRP",
		name: "simplexWrp",
		userSchema: [
			{
				title: "ENTRY DATE",
				name: "entryDate",
				bsonType: "string",
				displayType: "date",
			},
			{
				title: "FIN",
				name: "fin",
				bsonType: "array",
				displayType: "array",
			},
			{
				title: "IIN",
				name: "iin",
				bsonType: "array",
				displayType: "array",
			},
		],
	},
	{
		title: "R.S.B WRP",
		name: "rSBWrp",
		userSchema: [
			{
				title: "DATE AND TIME",
				name: "dateAndTime",
				bsonType: "string",
				displayType: "datetime",
			},
			{
				title: "SHIFT",
				name: "shift",
				bsonType: "string",
				displayType: "list",
				options: ["DS", "HN", "FN"],
			},
			{
				title: "DATA",
				name: "data",
				bsonType: "array",
				displayType: "array",
			},
		],
	},
	{
		title: "DAILY PRODUCTION",
		name: "dailyProduction",
		userSchema: [
			{
				title: "PRODUCTION DATE",
				name: "productionDate",
				bsonType: "string",
				displayType: "date",
			},
			{
				title: "SHIFT",
				name: "shift",
				bsonType: "string",
				displayType: "list",
				options: ["DAY SHIFT", "HALF NIGHT", "FULL NIGHT"],
			},
			{
				title: "SUPERVISOR NAME",
				name: "supervisorName",
				bsonType: "string",
				displayType: "list",
				options: ["GUNASEKARAN", "THIRUMALAI SAMY", "MANI"],
			},
			{
				title: "PREPARATORY PRODUCTION",
				name: "preparatoryProduction",
				bsonType: "array",
				displayType: "schemaArray",
				schema: [
					{
						title: "MACHINE NAME",
						name: "machineName",
						bsonType: "reference",
					},
					{
						title: "ATTENDED PERSON",
						name: "attendedPerson",
						bsonType: "reference",
					},
					{
						title: "HANKS",
						name: "hanks",
						bsonType: "float",
						displayType: "decimal",
					},
					{
						title: "HOURS",
						name: "hours",
						bsonType: "float",
						displayType: "decimal",
					},
				],
			},
			{
				title: "SPINNING PRODUCTION",
				name: "spinningProduction",
				bsonType: "array",
				displayType: "schemaArray",
				schema: [
					{
						title: "MACHINE NAME",
						name: "machineName",
						bsonType: "reference",
					},
					{
						title: "MACHINE COUNT",
						name: "machineCount",
						bsonType: "reference",
					},
					{
						title: "ATTENDED PERSON",
						name: "attendedPerson",
						bsonType: "reference",
					},
					{
						title: "HOURS",
						name: "hours",
						bsonType: "float",
						displayType: "decimal",
					},
					{
						title: "HANKS",
						name: "hanks",
						bsonType: "float",
						displayType: "decimal",
					},
					{
						title: "WASTE",
						name: "waste",
						bsonType: "float",
						displayType: "decimal",
					},
				],
			},
			{
				title: "AUTO CONER PRODUCTION",
				name: "autoConerPproduction",
				bsonType: "array",
				displayType: "schemaArray",
				schema: [
					{
						title: "MACHINE COUNT",
						name: "machineCount",
						bsonType: "reference",
					},
					{
						title: "ATTENDED PERSON",
						name: "attendedPerson",
						bsonType: "reference",
					},
					{
						title: "HOURS",
						name: "hours",
						bsonType: "float",
						displayType: "decimal",
					},
					{
						title: "KGS",
						name: "kgs",
						bsonType: "float",
						displayType: "decimal",
					},
				],
			},
			{
				title: "STOPPAGE DETAILS",
				name: "stoppageDetails",
				bsonType: "array",
				displayType: "schemaArray",
				schema: [
					{
						title: "MACHINE NAME",
						name: "machineName",
						bsonType: "reference",
					},
					{
						title: "REASONS",
						name: "reasons",
						bsonType: "string",
						displayType: "list",
						options: [
							"POWER FAILURE",
							"ELECTRICAL BREAKDOWN",
							"MECHANICAL BREAKDOWN",
							"MAINTENANCE",
							"CLEANING",
							"HAND SOTTAGE",
							"MIXING",
							"LAP STOCK",
						],
					},
					{
						title: "HOURS",
						name: "hours",
						bsonType: "float",
						displayType: "decimal",
					},
				],
			},
		],
	},
	{
		title: "PHYSICAL STOCK",
		name: "physicalStock",
		userSchema: [
			{
				title: "ENTRY DATE",
				name: "entryDate",
				bsonType: "string",
				displayType: "date",
			},
			{
				title: "40S FHPR STOCK",
				name: "40SFhprStock",
				bsonType: "float",
				displayType: "decimal",
			},
			{
				title: "30S FHPR STOCK",
				name: "30SFhprStock",
				bsonType: "float",
				displayType: "decimal",
			},
			{
				title: "40S KHY STOCK",
				name: "40SKhyStock",
				bsonType: "float",
				displayType: "decimal",
			},
			{
				title: "34S KHY STOCK",
				name: "34SKhyStock",
				bsonType: "float",
				displayType: "decimal",
			},
			{
				title: "30S KHY STOCK",
				name: "30SKhyStock",
				bsonType: "float",
				displayType: "decimal",
			},
		],
	},
];

const sch = [
	{
		"_id": {},
		"displayType": "text",
		"bsonType": "string",
		"title": "NAME",
		"name": "name",
		"labelPosition": "inline"
	},
	{
		"_id": {},
		"displayType": "text",
		"bsonType": "string",
		"title": "FULL NAME",
		"name": "fullName",
		"labelPosition": "stacked"
	}
];

export default sch;
