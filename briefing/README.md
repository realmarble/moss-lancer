# How to use
to set up your briefing, Open the Briefing Editor Macro in the module compendium, fill out the fields, click generate and see the preview. to launch your briefing without using the editor, 
create a new script macro, copy the generated json object and fill the macro with
`
CallBrief({The Generated Json Object})
`
. after that you should be able to call your briefing.
Warning: opening multiple briefings at the same time is not supported.