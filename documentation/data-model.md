# GoTaglio Data Model


## The four Entity Types

The GoTaglio data model consists of just four entity types. They are the _experiment_, _run_, _result_, and _case_.

### Experiment
An _experiment_ defines the semantics of an operation to be performed. One can perform an experiment by providing a set of input cases and configuration details such as versions of software libraries and models, and the values of specific configuration options. The result of performing the experiment is a _run_ entity.

While the term, _experiment_, implies a hypothesis-driven inquiery, in GoTaglio, the term applies more broadly to a repeatable process for generating _result_ records.

Typically each _result_ record is an annotation of a corresponding _case_ record, however in some scenarios, like importing data, the _result_ may stand on its own with no corresponding *case*.

Here are some example experiments:
* **Perform LLM inference**, using a prompt derived from each case.
* **Collect human labels** for each LLM input and output pair.
* **Have another LLM score the results** of the initial LLM
* **Assign project management labels** such are priority levels or scenario names.
* **Import new cases into the system.** An example might be a quality control system that collects photos of items on an assembly line, along with operator accept/reject labels. Another example would be a voice ordering system that collects audio recordings paired with cash register tapes.

### Run
A _run_ documents the specific configuration details and the _results_ of conducting a specific experiment at a point in time.

Each _run_ is associated with a specific _experiment_ and a collection of *results*.

In theory, the run contains sufficient information to allow one to replicate the experiment. This includes configuration details and the set of immutable input cases.

### Result
The output of a *run* is a set of _results_, where each result is associated with at most one _case_. One can think of a _result_ as the return value of a function, defined by the _experiment_, which takes a _case_ as input.

Examples include:
* Generate a prompt from a _case_, perform LLM inference, and return the LLM output
* a web application that presents a _case_ to a human who provides a label, which is returned in the _result_.

Note that in some experiments, the result may stand on its own with no corresponding input case. Think of this as a function with no parameters.

Examples include:
* A function that generates random numbers.
* An LLM that generates random text.
* A system that collects assembly line photos and quality assurance assessments from an external system.

### Case

The _case_ provides the input to the _experiment_ function which produces a _result_. A typical case for evaluating a system might pair an input with an expected output. Note,
however, that cases often support scenarios other than
evaluation, and these cases might not contain the expected output.

## Scenarios

At this point it may help to examine a common multi-step
workflow that involves a number of different types of cases.

Consider a team that is building an LLM-based ordering bot
for a coffee shop. In each session, the customer will start
out with an empty cart, and ask the bot to put various drinks
and pastries into the cart.

Here is one workflow the team might use to develop this bot:

* **Crowd source orders** from members of the team. The orders would initially be _results_ of a process that entered the orders - perhaps from a web app, or more likely from importing a spreadsheet. Note that at this point, the orders aren't paired with expected shopping carts.
* **Categorize and prioritize orders.** The crowd-sourced orders are likely of varying quality with skewed distributions. Program management may work with the team to categorize the orders by scenario and feasibility and then prioritize the categories according to business needs. This can be considered a second experiment, whose _results_ contain the categories and priorities.
* **Add expected carts.** At this point, the team might select a subset of high priority orders that are also feasible and begin an effort to label each with an expected shopping cart. This labelling process may be done manuallly or perhaps with a more powerful LLM than will be used in production. It is also possible that the labelling process will be a hybrid, where the LLM guesses the cart and then a human corrects it. The output of this process is a set of _results_ that can be combined with the initial cases to make evaluation cases that contain the user order and the expected cart.
* **Add observed behavior.** Now the team can uses these cases as the basis for an evaluation suite that first generates _results_ that contain the LLM response.
* **Evaluate a run.** These results can then be used to drive an evaluation process that uses human judges, or perhaps another LLM to determine how well that observed answer matches the expected answer.

Each step of this workflow involves
1. selecting from some join of existing _cases_ and _results_ to form a new set of _cases_.
2. running an _experiment_ on this new set of _cases_ to produce a new set of _results_. Some experiments, like capturing LLM output are fully automated, while others, like prioritization, triaging, and performing evaluation likely have a human in the loop. These human-in-the-loop operations may be directed by a web-based labelling system, or they may involve a more manual process of exporting records as csv, annotating in a spreadsheet, and importing the resulting records.

## Implementation Considerations

For now, let's assume that the four entities will reside in tables in a fully normalized relational database.

The design goal that _runs_ can always be reproduced implies that the _cases_ that serve as inputs to the _run_ must be preserved. One approach would be to store the _cases_ inside of the _run_.

While this would ensure that the cases would be available in perpetuity, it makes it hard to do longitudinal queries of results involving certain cases across time. As an example, there might be a product release gate experiment and the team would like to get a query of the most unreliable cases over time.

One way to facilitate these queries is to make _cases_ first
class citizens that are incorporated by reference. To do this we must ensure the cases are immutable.

An additional consideration is that we expect that cases will be shared around an organization and be incorporated into multiple, potentially unrelated, databases. This suggests that local mechanisms that enfore global immutability in unrelated systems are important.

### Immutability
One way to enforce immutability is to use a cryptographic hash of certain fields as the primary key. It may be that non-semantic fields, like the title, keywords, author, and priority are not hashed, but semantic fields like the user order and expected cart are hashed.

Cryptographic hashes have the beneficial property of local policy implementation with global reach across unrelated systems.

A downside of hashes as primary keys is performance - both in creating the hashes and indexing them. We don't expect that GoTaglio databases will every be big enough for the performance hit to be problematic. Also, we expect that teams will continuously curate and filter cases and will migrate the useful cases to new database instances on a regular basis.

Perhaps the biggest challenge of immutability is that there are many valid reasons to modify cases in small ways.

## Provenance Chains

Over time it is common for teams to discover that there are errors in their _cases_. There may be inadvertant typos or perhaps unicode characters from the wrong code page. As these cases are discovered we need some way to fix them, while also retaining information to assist in comparing results from before and after the fix.

If we enforce the constraint that the primary key is always the cryptographic hash of the _case_, we will find that the any edit will need to create a new record.

We'd certainly like utility functions that would replace instances of edited _cases_ in suites with their new versions, but we also need some way of understanding that this has happened.

Suppose we have an immutable _run_, R, which is based on immutable cases A, B, and C. We've discovered an error in case A, which we've repaired by creating A'. We then used the utility function to create R', which is based on A', B, and C.

Now we might want to compare R' with R. To do this, it would help to know how R' was derived from R, that this will lead us to the question of how A' was derived from A.

One solution is to maintain a provenance chain within each record. The provenance field is either null, for the first instance of a record, or it is the hash/primary key of the record it was derived from. 

The provenance field allows us to track the chain of edits, and a simple record diff algorithm can explain the edits along the chain.

## Open Questions

* _runs_ certainly store the primary keys of the _cases_ they are based on, but who stores sets of _cases_? We might call a set of cases a _suite_. Is this a fifth entity type? We probably don't want the _experiment_ to maintain the suite internally. The reason is that we'd like to run the same _experiment_ on different suites. We could accept a _run_ maintaining the suite internally, and use a utility funtion to rerun the _run_ with the same suite or a new one. One argument for suites as first class citizens is that we can attach useful metadata about the purpose of the suites and we can use the suite's primary key in queries about performance of the suite across time, model versions, etc.
