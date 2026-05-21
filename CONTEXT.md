# EuroKits Catalog

Domain language for the jersey catalog experience used in this project, covering how jerseys are described and presented to users.

## Language

**Jersey**:
A single football kit product offered in the catalog, tied to a club and season.
_Avoid_: Product, item

**Catalog**:
The public list of Jerseys available to browse, search, and filter.
_Avoid_: Collection

**Admin**:
An authenticated user role allowed to create, update, or delete Jerseys.
_Avoid_: Staff, editor

**Public User**:
Any unauthenticated visitor who can only read the Catalog.
_Avoid_: Guest

**Stock**:
The available quantity of a Jersey that can still be sold.
_Avoid_: Inventory

**Favorite**:
A Jersey marked by a Public User for quick access in the UI.
_Avoid_: Wishlist

## Relationships

- The **Catalog** contains many **Jersey**
- An **Admin** manages **Jersey** in the **Catalog**
- A **Public User** can only read the **Catalog**
- Each **Jersey** has a **Stock** value
- A **Public User** can mark a **Jersey** as a **Favorite**

## Example dialogue

> **Dev:** "Can a **Public User** add or edit a **Jersey**?"
> **Domain expert:** "No — only an **Admin** can manage Jerseys; the **Public User** can just browse the **Catalog**."

## Flagged ambiguities

- None so far.
