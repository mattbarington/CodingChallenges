#ifndef WILDCARDTRIE_H
#define WILDCARDTRIE_H
#include <map>
#include <string>

class TrieNode {
    friend class Trie;
  public:
    TrieNode() {
        endOfWord = false;
    }
    std::map<char, TrieNode*> children;
    bool endOfWord;
};


class WildcardTrie {
  private:
    TrieNode* root;
  public:
    WildcardTrie() {
        root = new TrieNode();
    }
    void insert(std::string str) {
        TrieNode* current = root;
        for (char c : str) {
            auto it = current->children.find(c);
            TrieNode* node = nullptr;
            if (it == current->children.end()) {
                node = new TrieNode();
                current->children.insert(std::pair<char, TrieNode*>(c, node));
            } else {
                node = it->second;
            }
            current = node;
        }
        current->endOfWord = true;
    }

    bool searchRecursive(TrieNode* current, std::string query, int index) {
        if (!current) {
            return false;
        }
        if (index == query.length()) {
            return current->endOfWord;
        }
        char c = query[index];
        if (c == '*') { //wildcard character. Recurse on all children.
            for (auto it : current->children) {
                if (searchRecursive(it.second, query, index + 1))
                    return true;
            }
            return false;
        } else {
            auto it = current->children.find(c);
            if (it == current->children.end()) {
                return false;
            } else {
                TrieNode* node = it->second;
                return searchRecursive(node, query, index + 1);
            }
        }
    }

    bool search(std::string query) {
        return searchRecursive(root, query, 0);
    }
    void remove(std::string str);
};

#endif
