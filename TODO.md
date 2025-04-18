# TODO

// npx tsx src/test.ts

Top
* Editors
  * x Remove RecordEditor
  * . Replace Editor with Editor2
  * x Migrate all editors to new model
  * Transition visual - fade to white
  * Is it possible to rely on useFormContext() instead of useEditorContext()?
  * Textarea initial rows based on number of lines?
* Initial context should be JSON field
* Factor JSON from LLMField
* New run button should create a job
* Are sessions immutable after creation?
* x Integrate RecordEditor into Editor framework 
* Editors should provide instructions
  * x group property - displays intructions for grouping nodes
  * x Markdown display
  * . Ability to display special symbols (create button, delete button)
* Consider renaming /frame route segment
* Fast refresh warning for useRouteData() hook
* Create
  * Needs to navigate to new record
* Delete
  * x Button in upper right
  * . Editor.tsx should provide delete-record button
  * Hover visuals
  * Navigate to parent node?
* x Remove DebugPane
* . Remove console spew
* x Deprecate concept of DetailSpec
* x NavLinks should replace
* Error updating runlog
  * DIAGNOSIS: this is because performUpdate is hard-coded to access `name` property which doesn't exist on runlog.
  * DetailPane.tsx:9 Uncaught TypeError: Cannot read properties of undefined (reading 'match')
    at updateStringVersion (DetailPane.tsx:9:23)
    at performUpdate (DetailPane.tsx:27:15)
* Form editing
  * Better components for form
    * x Delete button in navbar
    * x Component that implements form
    * TextArea (w/optional buttons)
    * Select
    * Array
  * Service mock on IndexedDB
    * Button to rebuild mock data in IndexedDB
    * Service gets data from IndexedDB
    * Service call updates record in IndexedDB
* Handle /frame/projects, /frame/projects1/suites, etc. where specific detail is not selected
  * x Modify convert() to use paths with type but no id
  * Handle case where there is no instance of child type
  * x Add NavLinks to type grouping nodes
  * Modify Detail or (TypeDetail components) to render instructions
* Rename RecordEditor to CaseEditor
* Port CaseEditor to use mock store.
* Port mock store to use LocalStorage.
* Error at http://localhost:5173/frame: Error: Cannot destructure property 'type' of 'path[(path.length - 1)]' as it is undefined.
* Error: handle no route found: No routes matched location "/record"
* x Sessions needs route navigation (vs hard-coded sample data) and App.tsx nested route
* Use path combination library
* Check route components for safety
* Are encode/decode URI necessary or does react-router handle these?
* x Mocks folder
* x Route loads correct sidebar
* x Route loads correct detail
* . Form editors
* Expand/collapse
* RecordEditor
  * Delete button in navbar
  * Rename
* Project editor
* Suite editor
* Run viewer
* Annotations
  * Instructions
  * Viewing template
  * Field definitions
* Sessions
  * x TODO: sessions not showing up in tree
  * Dashboard
  * Work
* Cleanup
  * x App.ts casing error about RecordEditor
  * x Reogranize folders - components, logic, etc.
  * x Remove unused components
  * Remove dead code
    * x SuiteLayout - commented out code
    * x SuitePage - entire file
  * Figure out unit tests or how to run one-offs
  * . index.css
* Navigation
  * x Put useful links on default root
  * x Extract frame/layout component
  * x Route design
  * Selected item
  * Toggle open/clossed
  * x Detail page
  * New item
    * x Button location
    * . Position and appearance in tree
  * Delete item
    * What is new route?
  * Dirty item warning on navigation
  * . Visuals
* Data model
  * Are expected values in turns
    * POJOs?
    * Strings?
* Wireframe
  * Project / Suite / Case hierarchy
  * Emoticon
  * Projects have pipelines, schemas, suites, runs, and annotations
  * Suties have cases
  * Maybe use local storage to simulate db?
  * Copy case button
    * Who creates UUID? When does this happen?
  * Edited/Unsaved indicator
  * Prompt to save on navigation
  * Navigate sequence
    * Show loading spinner
    * Get case
    * Store case in local storage
    * Render form
  * Delete case
    * Where to navigate to? Unselected case list?
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

~~~
git reset --mixed HEAD~1
git checkout main -- .
git checkout main
~~~
