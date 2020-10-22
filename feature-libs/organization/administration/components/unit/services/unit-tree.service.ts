import { Injectable } from '@angular/core';
import {
  B2BUnitNode,
  B2BUnitTreeNode,
} from '@spartacus/organization/administration/core';
import { BehaviorSubject } from 'rxjs';
import { TREE_TOGGLE } from './unit-tree.model';

/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
@Injectable({
  providedIn: 'root',
})
export class UnitTreeService {
  protected minimalExpanded = 1;
  private _cachedMinimalExpanded;

  treeToggle$: BehaviorSubject<Map<string, TREE_TOGGLE>> = new BehaviorSubject(
    new Map()
  );

  initialize(root: B2BUnitNode, key: string): void {
    if (key) {
      this.expandUntilActiveNode(root, key);
    }
  }

  collapseAll(unitId: string) {
    this._cachedMinimalExpanded = this.minimalExpanded;
    this.minimalExpanded = 0;
    this.treeToggle$.next(new Map().set(unitId, TREE_TOGGLE.COLLAPSE_ALL));
  }

  expandAll(unitId: string) {
    if (this._cachedMinimalExpanded) {
      this.minimalExpanded = this._cachedMinimalExpanded;
    }
    this.treeToggle$.next(new Map().set(unitId, TREE_TOGGLE.EXPAND_ALL));
  }

  isExpanded(unitId: string, level: number, parent?: TREE_TOGGLE): boolean {
    const toggle = this.treeToggle$.value?.get(unitId);
    return (
      toggle === TREE_TOGGLE.EXPANDED ||
      toggle === TREE_TOGGLE.EXPAND_ALL ||
      parent === TREE_TOGGLE.EXPAND_ALL ||
      (toggle !== TREE_TOGGLE.COLLAPSED && level < this.minimalExpanded) ||
      (toggle === TREE_TOGGLE.COLLAPSE_ALL && level < this.minimalExpanded)
    );
  }

  toggle(unit: B2BUnitTreeNode) {
    const currentState = this.treeToggle$.value;
    const root = currentState?.values().next().value;
    if (root === TREE_TOGGLE.EXPAND_ALL) {
      currentState.clear();
    }

    const newState =
      root === TREE_TOGGLE.EXPAND_ALL ||
      this.isExpanded(unit.id, unit.depthLevel)
        ? TREE_TOGGLE.COLLAPSED
        : TREE_TOGGLE.EXPANDED;

    currentState.set(unit.uid, newState);
    this.treeToggle$.next(currentState);
  }

  getToggleState(unitId: string): TREE_TOGGLE {
    return this.treeToggle$.value?.get(unitId);
  }

  /**
   * Expands all tree nodes till the active unit, to ensure that the
   * full tree is collapsed till the active item.
   *
   * This is useful while navigating the tree by the router.
   */
  protected expandUntilActiveNode(node: B2BUnitNode, activeUnitId: string) {
    const hasActiveChild = (n: B2BUnitNode, id: string): boolean =>
      !!n.children?.find(
        (child) => child.id === id || hasActiveChild(child, id)
      );

    const findInvolvedTreeNodes = (
      n: B2BUnitNode,
      activeItems = []
    ): string[] => {
      if (hasActiveChild(n, activeUnitId)) {
        activeItems.push(n.id);
      }
      n.children.forEach((child) => {
        findInvolvedTreeNodes(child, activeItems);
      });
      return activeItems;
    };

    const m = this.treeToggle$.value;
    findInvolvedTreeNodes(node).forEach((activeId) => {
      if (m.get(activeId) !== TREE_TOGGLE.EXPANDED) {
        m.set(activeId, TREE_TOGGLE.EXPANDED);
      }
    });
    if (m !== this.treeToggle$.value) {
      this.treeToggle$.next(m);
    }
  }
}
