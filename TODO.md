# TODO

Top
* Wireframe
  * Delete case
  * Keywords
    * x styling
    * . list of suggested tags
    * x react-tag-autocomplete
    * x react-select creatable
    * duplicates
    * sort order
  * x Factor out components
  * x Loading UI for LLM textarea
  * . LLM call
  * Validate call
    * Debounce on change
    * Reformat with JSON.stringify
  * x Delete button becomes 'x' in upper right
  * Validation error
  * Drag/drop to reorder turns
* Detecting and handling merge conflicts
* Are names scoped, e.g. suite names scoped to projects, case uuids scoped to suites?
  * If not, can we use a flat URL structure?
  * Probably not because the sidebar and navbar show the suite and project context.
  * Should the sidebar just be a three-level tree of project -> suites -> cases?
* . Sample suite data structure
* . Mock backend
* Better names
  * SuiteHome
  * SuiteLayout
  * SuitePage
  * CaseDetail - detail pane has title and holds CaseEditor
  * CaseEditor - editing form
* Suite
  * metadata edit at suite/id
  * case list
    * remove button
    * add button
* Case
  * edit at suite/id1/case/id2
  * remove button
  * commit button
  * cancel button
  * confirm navigation dialog -useBlocker
  * Turn
    * remove button
    * add turn button
* Undo framework

* x Upgrade node
* Consider nvm
* x Create repo
* x Create github repo
* x License
* Backend
  * x .gitignore
  * x Rest client
  * x FastAPI, uvcorn, pydantic, sqlalchemy
* Frontend
  * CaseEditor
    * Hybrid resolver: zod and web service
  * .gitignore - made by vite - consider https://github.com/github/gitignore/blob/main/Node.gitignore
  * x vite
  * Configure Vite to build into FastAPI's static folder
  * x gts
  * x Fix `npm run compile` - errors in node_modules
  * Fix .eslintrc.json
* VSCode extensions
  * x Rest client (curl)


* Web page structure
  * Navbar at top
    * Autocomplete suite finder/switcher
  * Sidebar
    * Shows cases in current suite
    * Button to add new case at bottom
    * Autocomplete case finder
    * Selected case highlighted
    * Drag/drop ordering
    * Keyword filtering
    * Styling for edited state
    * Export suite button
    * Up/down arrow to change selected case?
  * Content
    * Case id
    * Keywords
    * Description
    * Comments/notes
    * Turns
      * User text
      * Agent response
        * Agent attempt button
        * Validate button
      * Add turn
      * Remove turn
      * Copy turn?
    * Edited/unedited state
      * Save button
      * Cancel button
      * Prompt for save/cancel on navigate
      * Can we leave multiple cases in edited state?
        * Or do we have to save before switching suites/cases

* Projects can have names
  * In many cases one can find the suite of interest without inspecting the project
  * The project is mainly needed for editing metadata
* Annotations likely have names, but the names are scoped to the project
  * Why can't annotations be shared by multiple projects?
  * Why do annotations even need to be associated with projects.
  * Seems that tasks/sessions are associated with (Project, Annotation, Template)
* Suites should probably have ids as many can be created, some by code
* Cases should have ids

* Projects
  * Project
    * Suites
      * Suite
        * Metadata
        * Cases
          * Case
            * Metadata
            * Turns
    * Annotations (Project, Annotation schema)
    * Runs (Project/Suite => RunLog)
    * Tasks/Jobs/Sessions (Project, Annotation, Template, Runlog)


npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@typescript-eslint/eslint-plugin@8.28.0',
npm WARN EBADENGINE   required: { node: '^18.18.0 || ^20.9.0 || >=21.1.0' },
npm WARN EBADENGINE   current: { node: 'v19.8.1', npm: '9.5.1' }
npm WARN EBADENGINE }
~~~
