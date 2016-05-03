var content = 
	[
		{
			"title":"About",
		},
		{
			"title":"Overview",
		},
		{
			"title":"Getting Started",
			"file":["gettingstarted.html", "gettingstarted_intro.md"]
		},
		{
			"title":"Action",
			"children":[
				{
					"title":"Create",
					"file":["create.html", "create_intro.md"]
				},
				{
					"title":"Read",
					"file":["read.html", "read_intro.md"]
				},
				{
					"title":"Update",
					"file":["update.html", "update_intro.md"]
				},
				{
					"title":"Delete",
					"file":["delete.html", "delete_intro.md"]
				},
				{
					"title":"Query",
					"file":["query.html", "query_intro.md"],
					"children":[
						{
							"title":"Condition",
							"file":["condition.html"]
						},
						{
							"title":"Order",
						},
						{
							"title":"Pagination",
							"file":["pagination.html"]
						},
						{
							"title":"Aggregation",
							"file":["aggregation.html"]
						},
					]
				},
				{
					"title":"QueryRef",
					"file":["queryref.html", "queryref_intro.md"]
				},
				{
					"title":"QueryRefCandidate",
					"file":["queryrefcandidate.html", "queryrefcandidate_intro.md"]
				},
				{
					"title":"AddReference",
					"file":["addreference.html", "addreference_intro.md"]
				},
				{
					"title":"RemoveReference",
					"file":["removereference.html", "removereference_intro.md"]
				},
			]
		},
		{
			"title":"Entity",
			"children":[
				{
					"title":"Property",
					"children":[
						{
							"title":"String",
							"file":["string.html", "string_intro.md"]
						},
						{
							"title":"Text",
							"file":["text.html", "text_intro.md"]
						},
						{
							"title":"Short",
							"file":["short.html", "short_intro.md"]
						},
						{
							"title":"Integer",
							"file":["integer.html", "integer_intro.md"]
						},
						{
							"title":"Long",
							"file":["long.html", "long_intro.md"]
						},
						{
							"title":"Float",
							"file":["float.html", "float_intro.md"]
						},
						{
							"title":"Double",
							"file":["double.html", "double_intro.md"]
						},
						{
							"title":"Decimal",
							"file":["decimal.html", "decimal_intro.md"]
						},
						{
							"title":"Date",
							"file":["date.html", "date_intro.md"]
						},
						{
							"title":"DateTime",
							"file":["datetime.html", "datetime_intro.md"]
						},
						{
							"title":"Time",
							"file":["time.html", "time_intro.md"]
						},
						{
							"title":"TimeStamp",
							"file":["timestamp.html", "timestamp_intro.md"]
						},
					]
				},
				{
					"title":"Reference",
					"children":[
						{
							"title":"One To One",
							"file":["one2one.html"]
						},
						{
							"title":"One To One Single-directional",
							"file":["one2one_s.html"]
						},
						{
							"title":"One To One Bidirectional",
							"file":["one2one_i.html"]
						},
						{
							"title":"One To One Ancestry",
							"file":["one2one_a.html"]
						},
						{
							"title":"One To One Ancestry Weak",
							"file":["one2one_aw.html"]
						},
						{
							"title":"One To One Descendant",
							"file":["one2one_d.html"]
						},
						{
							"title":"One To One Descendant Weak",
							"file":["one2one_dw.html"]
						},
						{
							"title":"One To Many",
							"file":["one2many.html"]
						},
						{
							"title":"One To Many Single-directional",
							"file":["one2many_s.html"]
						},
						{
							"title":"One To Many Bidirectional",
							"file":["one2many_i.html"]
						},
						{
							"title":"One To Many Descendant",
							"file":["one2many_d.html"]
						},
						{
							"title":"One To Many Descendant Weak",
							"file":["one2many_dw.html"]
						},
						{
							"title":"Many To One",
							"file":["many2one.html"]
						},
						{
							"title":"Many To One Single-directional",
							"file":["many2one_s.html"]
						},
						{
							"title":"Many To One Bidirectional",
							"file":["many2one_b.html"]
						},
						{
							"title":"Many To One Ancestry",
							"file":["many2one_a.html"]
						},
						{
							"title":"Many To One Ancestry Weak",
							"file":["many2one_aw.html"]
						},
						{
							"title":"Many To Many",
							"file":["many2many.html"]
						},
						{
							"title":"Many To Many Single-directional",
							"file":["many2many_s.html"]
						},
					]
				},
			]
		},
		{
			"title":"Multiple Files",
			"file":["main.html", 
			"html_create.html",  "query/html_query.html", 
			"html_create.js", "js/html_query.js", 
			"html_create.css", "html_query.css"]
		},
		{
			"title":"JavaScript",
			"children":[
				{
					"title":"CP_Init",
					"file":["cp_init.html"],
				},
				{
					"title":"CP_DoAction",
					"file":["cp_doaction.html"],
				},
				{
					"title":"CP_AfterAction",
					"file":["cp_afteraction.html"],
				},
				{
					"title":"CP_BeforeAction",
					"file":["cp_beforeaction.html"],
				},
				{
					"title":"CP_UpdateView",
					"file":["cp_updateview.html"],
				},
				{
					"title":"CP_AfterUpdateView",
					"file":["cp_afterupdateview.html"],
				},
				{
					"title":"CP_BeforeUpdateView",
					"file":["cp_beforeupdateview.html"],
				},
				{
					"title":"CP_RequestAction",
					"file":["cp_requestaction.html", 
					"cp_requestaction_querycondition.md", "cp_requestaction_querycondition.html",
					"cp_requestaction_querypagination.md", "cp_requestaction_querypagination.html",
					"cp_requestaction_reference.md", "cp_requestaction_reference.html"],
				},
				{
					"title":"JavaScript Summary",
					
				},
				
				
			]
		},
		{
			"title":"Callback",
			"file":["callback_main.html", "mycallback.callback.js", "html_callback.html"],
			"children":[
				{
					"title":"CP_AppInit",
					
				},
                {
					"title":"CP_ExecuteAction",
					"file":["executeaction_main.html", "html_executeaction.html", "executeaction.callback.js"],
				},
                {
					"title":"Block Action",
					"file":["block_main.html", "block.callback.js", "html_block_callback.html"],
				},
				{
					"title":"JavaScript White List",
				},
			]
		},
		{
			"title":"HTTP Session",
			"file":["httpsession_main.html", "httpsession.callback.js", "html_httpsession.html"],
		},
		{
			"title":"Database Extension",
			"file":["databaseextension.html"],
		},
		{
			"title":"Template",
			"file":["template.html", "item.html"],
		},
		{
			"title":"Work With AngularJS",
			"file":["angularjs_main.html", "html_angularjs_create.html", "html_angularjs_query.html", "angularjs_script.js"],
		},
		{
			"title":"Console",
			"children":[
				{
					"title":"Export"
				},
				{
					"title":"Code"
				},
				{
					"title":"Data"
				},
				{
					"title":"Test",
					"file":["test_main.html", "html_test_create.html", "test01.json"],
				},
				{
					"title":"Page"
				},
			]
		},


	];




